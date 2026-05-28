import {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ApiPet, Pet } from "../types/pet";
import { normalizePets } from "../utils/normalizePets";

const PETS_ENDPOINTS = ["/pets", "https://eulerity-hackathon.appspot.com/pets"];

export type PetsContextValue = {
  pets: Pet[];
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export const PetsContext = createContext<PetsContextValue | null>(null);

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "AbortError";
}

async function fetchPets(signal: AbortSignal): Promise<Pet[]> {
  let lastError: Error | null = null;

  for (const endpoint of PETS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, { signal });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}.`);
      }

      const data = (await response.json()) as ApiPet[];

      if (!Array.isArray(data)) {
        throw new Error("Unexpected response format from /pets.");
      }

      // Normalize the API shape immediately so the rest of the app works with
      // stable IDs and parsed timestamps.
      return normalizePets(data);
    } catch (error) {
      if (isAbortError(error)) {
        throw error;
      }

      lastError =
        error instanceof Error ? error : new Error("Unable to load pets.");
    }
  }

  throw lastError ?? new Error("Unable to load pets.");
}

export function PetsProvider({ children }: PropsWithChildren) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const activeRequestId = useRef(0);
  const activeController = useRef<AbortController | null>(null);

  const loadPets = useCallback(async () => {
    const requestId = ++activeRequestId.current;
    activeController.current?.abort();

    const controller = new AbortController();
    activeController.current = controller;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextPets = await fetchPets(controller.signal);

      if (
        controller.signal.aborted ||
        requestId !== activeRequestId.current
      ) {
        return;
      }

      setPets(nextPets);
    } catch (error) {
      if (
        controller.signal.aborted ||
        requestId !== activeRequestId.current ||
        isAbortError(error)
      ) {
        return;
      }

      setPets([]);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to load pets right now.",
      );
    } finally {
      if (
        controller.signal.aborted ||
        requestId !== activeRequestId.current
      ) {
        return;
      }

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPets();

    return () => {
      activeRequestId.current += 1;
      activeController.current?.abort();
    };
  }, [loadPets]);

  const value = useMemo<PetsContextValue>(
    () => ({
      pets,
      isLoading,
      errorMessage,
      isEmpty: !isLoading && !errorMessage && pets.length === 0,
      refetch: loadPets,
    }),
    [errorMessage, isLoading, loadPets, pets],
  );

  return (
    <PetsContext.Provider value={value}>{children}</PetsContext.Provider>
  );
}
