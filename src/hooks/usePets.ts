import { useContext } from "react";
import { PetsContext, PetsContextValue } from "../context/PetsContext";

export function usePets(): PetsContextValue {
  const context = useContext(PetsContext);

  if (!context) {
    throw new Error("usePets must be used inside PetsProvider.");
  }

  return context;
}
