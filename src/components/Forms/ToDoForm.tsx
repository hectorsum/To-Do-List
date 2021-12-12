import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// import { State } from '../../state';
import { createNoteAction, getSingleNote, updateNoteAction } from '../../state/action-creators';
import { Payload } from '../../state/actions';
import { SubmitButton } from '../Buttons/SubmitButton';
import { InputActivity } from '../Inputs/InputActivity';
import { ButtonType } from '../Types';

export interface Data {
  activity: string
}

type FormElement = React.SyntheticEvent
interface Props {
  isEditing: boolean,
  edit: Payload,
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}
enum PopupType {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE"
}
export const ToDoForm: React.FC<Props> = ({ isEditing, edit, setIsEditing }): JSX.Element => {
  const [activity, setActivity] = useState<string>("");
  const dispatch = useDispatch();
  const alert = useAlert();
  //To have interaction with action functions we need to insert it to a dispatch
  const addNote = (data: Data) => dispatch(createNoteAction(data));
  const updateNote = (data: Payload) => dispatch(updateNoteAction(data));

  const handleActivity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setActivity(e.target.value);
  }
  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    if (!activity) {
      document.getElementsByName('activity')[0].focus();
      return;
    };
    addNote({ activity })
    setActivity('');
    alert.success("New note added!");
  }
  const emptyField = (): void => setActivity("");
  const popupMessage = (msg: string, type: PopupType): void => {
    if (PopupType.ADD === type){
      alert.success(msg);
    }else if (PopupType.UPDATE === type){
      alert.info(msg);
    }else if (PopupType.DELETE === type){
      alert.info(msg)
    }
  }

  const handleUpdate = (e: FormElement) => {
    e.preventDefault();
    let { id } = edit;
    updateNote({id, activity});
    setIsEditing(false);
    emptyField();
    popupMessage("Note Updated!", PopupType.UPDATE);
  }
  useEffect(() => {
    if(isEditing){
      setActivity(edit.activity);
      if (edit.id){
        const retrieveNotes = (id) => dispatch(getSingleNote(id));
        retrieveNotes(edit.id);
      }
    }
  },[edit.activity,isEditing, dispatch, edit.id])
  return (
    <Form onSubmit={(isEditing) ? handleUpdate : handleSubmit}>
      <InputActivity type="text" name="activity" value={activity} onChange={handleActivity} autoComplete="off" />
      <SubmitButton btnType={(isEditing) ? ButtonType.UPDATE : ButtonType.ADD} />
    </Form>
  )
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;