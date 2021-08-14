import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../state";
import { createNoteAction } from "../state/action-creators"
import { Payload } from "../state/actions"
import { useAlert } from "react-alert";
type FormElement = React.SyntheticEvent
export const CreateNote = (): JSX.Element => {
  const [activity, setActivity] = useState<string>("");
  const [when, setWhen] = useState<Date>(new Date());
  const dispatch = useDispatch();
  const alert = useAlert();
  //useSelector allows us to read whatever we have in the state
  const { loading,error } = useSelector((state: RootState) => state.notes);
  console.log("error: ", error);
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
    addNote({ activity, when })
  }
  const showAlert = () => {
    alert.show("New note added!");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Create Note</h1>
        {
          (error) ? <h4>There was an error</h4>
          : (loading) ? <h4>Loading..</h4>
            : <>
              <input type="text" name="activity" value={activity} onChange={handleActivity} />
              <input type="datetime-local" name="when" value={when.toISOString().slice(0, 16)} onChange={handleWhen} />
              <button type="submit" onClick={showAlert}>Create</button>
            </>
        }
      </form>
    </>
  )
}
