import { ActionType } from "../action-types";
import { Dispatch } from 'redux'
import { Action, Payload } from '../actions'
import axios from "axios";
import axiosClient from "../../config/axios";

export const createNoteAction = (note: Payload) => async (dispatch:Dispatch<Action>) => {
  dispatch({
    type: ActionType.ADD
  })
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axiosClient.post('/notes', note, config)
    dispatch({
      type: ActionType.ADD_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: ActionType.ADD_ERROR,
      payload: note
    })
  }
}