import { ActionType } from "../action-types";
import { Dispatch } from 'redux'
import { Action, Payload } from '../actions'
import axiosClient from "../../config/axios";
import { AxiosError } from "axios";
import { Data } from "../../components/Forms/ToDoForm";

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
}

export const createNoteAction = (note: Data) => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await axiosClient.post('/notes', note, config);
    dispatch({
      type: ActionType.ADD_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ActionType.ADD_ERROR,
      payload: true
    })
  }
}

export const updateNoteAction = (formData:Payload) => async(dispatch: Dispatch<Action>) => {
  try {
    const res = await axiosClient.put(`/notes/${formData.id}`, formData, config);
    // console.log("updated: ", res)
    dispatch({
      type:ActionType.EDIT,
      payload:{
        id: formData.id,
        activity: res.data.activity,
        isDone: formData.isDone,
      }
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionType.DELETE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const getSingleNote = (id: number) => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await axiosClient.get(`/notes/${id}`,config);
    dispatch({
      type: ActionType.RETRIEVE_SINGLE_NOTE,
      payload: res.data,
    });
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionType.RETRIEVE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      });
    }
  }
}

export const getNotesAction = () => async (dispatch: Dispatch<Action>) => {
  dispatch({ type: ActionType.CLEAR_NOTES })
  try {
    const res = await axiosClient.get('/notes', config)
    // console.log("res: ",res);
    dispatch({
      type: ActionType.RETRIEVE_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionType.DELETE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const deleteNoteAction = (id: number) => async (dispatch: Dispatch<Action>) => {
  try {
    await axiosClient.delete(`/notes/${id}`, config)
    dispatch({
      type: ActionType.DELETE,
      payload: id
    })
  } catch (err) {
    let error = err as AxiosError;
    if (error.response) {
      dispatch({
        type: ActionType.DELETE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}

export const setDoneNoteAction = (formData: Payload) => async (dispatch: Dispatch<Action>) => {
  try {
    const res = await axiosClient.put(`/notes/${formData.id}`,formData, config)
    console.log("res: ",res)
    dispatch({
      type: ActionType.SETDONE,
      payload: res.data
    })
  } catch (err) {
    let error = err as AxiosError
    if(error.response){
      dispatch({
        type: ActionType.SETDONE_ERROR,
        payload: {
          msg: error.response.data,
          status: error.response.status
        }
      })
    }
  }
}