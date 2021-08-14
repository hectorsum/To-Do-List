import { ActionType } from "../action-types";

export interface Payload {
  id?:number,
  activity: string,
  when: Date,
}
export interface State {
  notes: Array<Payload>,
  note?:Payload | null,
  loading:Boolean,
  error:Boolean | null
}
interface AddAction {
  type: ActionType.ADD,
}
interface AddSuccess {
  type: ActionType.ADD_SUCCESS,
  payload: Payload
}
interface EditAction {
  type: ActionType.EDIT,
  payload: Payload
}
interface DeleteAction {
  type: ActionType.DELETE,
  payload: Payload
}
interface RetrieveAction {
  type: ActionType.RETRIEVE,
  payload: Payload
}
interface AddError {
  type: ActionType.ADD_ERROR,
  payload: boolean
}

export type Action = AddAction | 
                     AddSuccess |
                     AddError |
                     EditAction | 
                     DeleteAction | 
                     RetrieveAction