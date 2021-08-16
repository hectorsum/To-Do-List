import { createContext, useContext } from "react";
import { Payload } from "../state/actions";

export const NoteContext = createContext<Payload>({
  id:null,
  activity:''
});
export const useGlobalContext = () => useContext(NoteContext)