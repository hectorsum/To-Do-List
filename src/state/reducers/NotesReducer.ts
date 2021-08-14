import { ActionType } from "../action-types"
import { Action, State } from "../actions"

const initialState: State = {
  notes: [],
  note: null,
  loading:false,
  error:null
}

const reducer = (state: State = initialState, action: Action) => {
  switch(action.type){
    case ActionType.ADD:
      return {
        ...state,
        loading:true
      }
    case ActionType.ADD_SUCCESS:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        loading:false
      }
    case ActionType.ADD_ERROR:
      return {
        ...state,
        error:action.payload,
        loading:false,
      }
    case ActionType.RETRIEVE:
      return {
        ...state,
        notes: action.payload, //this payload is going to be the fetch response
        loading:false
      }
    case ActionType.EDIT:
      return state.notes.map((note) => {
        if(note.id === action.payload.id){
          return {
            ...state.note,
            ...action.payload
          }
        }else{
          return note;
        }
      })
    case ActionType.DELETE:
      return state.notes.filter((note) => note.id !== action.payload.id)
    default:
      return state;
  }
}

export default reducer;