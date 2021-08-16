import { ActionType } from "../action-types";

export interface Payload {
  id:number | null,
  activity: string,
}
interface Error {
  msg: string,
  status:number
}
export interface State {
  notes: Array<Payload>,
  note?:Payload | null,
  loading:Boolean,
  error:Error | null
}
interface AddAction {
  type: ActionType.ADD,
}
interface AddSuccess {
  type: ActionType.ADD_SUCCESS,
  payload: Payload
}
interface AddError {
  type: ActionType.ADD_ERROR,
  payload: boolean
}
interface EditAction {
  type: ActionType.EDIT,
  payload: Payload
}
interface DeleteAction {
  type: ActionType.DELETE,
  payload: number
}

interface RetrieveAction {
  type: ActionType.RETRIEVE,
  payload:boolean
}
interface RetrieveSuccess {
  type: ActionType.RETRIEVE_SUCCESS,
  payload: Payload
}
interface RetrieveError {
  type: ActionType.RETRIEVE_ERROR,
  payload: boolean
}
interface DeleteError {
  type: ActionType.DELETE_ERROR,
  payload: Error
}
interface ClearNotes {
  type: ActionType.CLEAR_NOTES,
}

export type Action = AddAction | 
                     AddSuccess |
                     AddError |
                     EditAction | 
                     DeleteAction |
                     DeleteError |  
                     RetrieveAction |
                     RetrieveSuccess |
                     RetrieveError | 
                     ClearNotes