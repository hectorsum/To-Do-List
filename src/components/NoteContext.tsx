import { createContext, useContext } from "react";
import { Payload } from "../state/actions";

export const NoteContext = createContext(null);
export const useGlobalContext = () => useContext(NoteContext)