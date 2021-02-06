import {
  Context,
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

export type ContextType<T> = [T, Dispatch<SetStateAction<T>>];

export function createTypedContext<T>() {
  return createContext<ContextType<T> | undefined>(undefined);
}

export function createProvider<T>(
  context: Context<ContextType<T> | undefined>,
  defaultVal: T
) {
  return (props: PropsWithChildren<unknown>) => {
    const [state, setState] = useState<T>(defaultVal);
    const [val, setVal] = useMemo(() => [state, setState], [state]);

    return (
      <context.Provider value={[val, setVal]}>
        {props.children}
      </context.Provider>
    );
  };
}

export const useTypedContext = <_, T>(
  context: Context<ContextType<T> | undefined>
) => useContext(context) as ContextType<T>;
