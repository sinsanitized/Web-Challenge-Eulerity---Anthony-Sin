import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";

type SelectionState = {
  selectedIds: string[];
};

type SelectionAction =
  | { type: "toggle"; payload: string }
  | { type: "select-many"; payload: string[] }
  | { type: "clear" };

type SelectionContextValue = {
  selectedIds: string[];
  selectedCount: number;
  isSelected: (id: string) => boolean;
  toggleSelection: (id: string) => void;
  selectMany: (ids: string[]) => void;
  clearSelection: () => void;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

function selectionReducer(
  state: SelectionState,
  action: SelectionAction,
): SelectionState {
  switch (action.type) {
    case "toggle":
      return state.selectedIds.includes(action.payload)
        ? {
            selectedIds: state.selectedIds.filter((id) => id !== action.payload),
          }
        : { selectedIds: [...state.selectedIds, action.payload] };
    case "select-many": {
      const nextIds = new Set(state.selectedIds);
      action.payload.forEach((id) => nextIds.add(id));
      return { selectedIds: [...nextIds] };
    }
    case "clear":
      return { selectedIds: [] };
    default:
      return state;
  }
}

export function SelectionProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(selectionReducer, { selectedIds: [] });

  const value = useMemo<SelectionContextValue>(
    () => ({
      selectedIds: state.selectedIds,
      selectedCount: state.selectedIds.length,
      isSelected: (id) => state.selectedIds.includes(id),
      toggleSelection: (id) => dispatch({ type: "toggle", payload: id }),
      selectMany: (ids) => dispatch({ type: "select-many", payload: ids }),
      clearSelection: () => dispatch({ type: "clear" }),
    }),
    [state.selectedIds],
  );

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection(): SelectionContextValue {
  const context = useContext(SelectionContext);

  if (!context) {
    throw new Error("useSelection must be used inside SelectionProvider.");
  }

  return context;
}
