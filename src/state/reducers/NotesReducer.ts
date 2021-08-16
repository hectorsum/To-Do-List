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
    case ActionType.RETRIEVE:
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
    case ActionType.RETRIEVE_ERROR:
      return {
        ...state,
        error:action.payload,
        loading:false,
      }
    case ActionType.RETRIEVE_SUCCESS:
      return {
        ...state,
        notes: action.payload, //this payload is going to be the fetch response
        loading:false,
        error:null
      }
    case ActionType.EDIT:
      return state.notes.map((note) => {
        if(note.id === action.payload.id){
          return {
            ...state.note,
            notes:[...state.notes,action.payload]
          }
        }else{
          return note;
        }
      })
    case ActionType.DELETE_ERROR:
      return {
        ...state,
        loading:false,
        error: action.payload
      }
    case ActionType.DELETE:
      return {
        ...state,
        loading:false,
        notes: state.notes.filter((note) => note.id !== action.payload),
      }
    case ActionType.CLEAR_NOTES:
      return {
        ...state,
        notes: [],
        loading:false
      }
    default:
      return state;
  }
}

export default reducer;