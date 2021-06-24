import { createContext, useContext } from "react";

export const stateContext = createContext();
export const useGlobalState = useContext(StateContext);