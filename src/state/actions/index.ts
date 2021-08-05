import { ActionType } from "../action-types";

interface Payload {
  id?:number,
  activity: string,
  when: Date,
}
export interface State {
  notes: Array<Payload>,
  note?:Payload | null,
  loading:Boolean,
}
interface AddAction {
  type: ActionType.ADD,
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

export type Action = AddAction | EditAction | DeleteAction | RetrieveAction