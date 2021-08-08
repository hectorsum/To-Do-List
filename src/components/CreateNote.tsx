import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from 'react-redux';
import { bindActionCreators } from "redux";
import { ActionCreators, State } from "../state";
import { createNoteAction } from "../state/action-creators"
import { Payload } from "../state/actions"
type FormElement = React.SyntheticEvent
export const CreateNote = (): JSX.Element => {
  const [activity, setActivity] = useState<string>("");
  const [when, setWhen] = useState<Date>(new Date());
  const dispatch = useDispatch();
  //To have interaction with action functions we need to insert it to a dispatch
  const addNote = (data: Payload) => dispatch(createNoteAction(data));
  const handleWhen = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const date: Date = new Date(Date.parse(value));
    setWhen(date);
  }
  const handleActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  }
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addNote({activity,when})
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create Note</h1>
        <input type="text" name="activity" value={activity} onChange={handleActivity}/>
        <input type="datetime-local" name="when" value={when.toISOString().slice(0,16)} onChange={handleWhen}/>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}
