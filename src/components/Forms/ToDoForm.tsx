import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../state';
import { createNoteAction } from '../../state/action-creators';
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
export const ToDoForm: React.FC<Props> = ({isEditing, edit, setIsEditing}): JSX.Element => {
  console.log('edit: ',edit);
  const [activity, setActivity] = useState<string>("");
  const dispatch = useDispatch();
  const alert = useAlert();
  //useSelector allows us to read whatever we have in the state
  const { error } = useSelector((state: State) => state.notes);
  //To have interaction with action functions we need to insert it to a dispatch
  const addNote = (data: Data) => dispatch(createNoteAction(data));
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
  const handleUpdate = (e: FormElement) => {
    e.preventDefault();
    console.log('Updated!');
    setIsEditing(false);
  }
    
  return (
    <Form onSubmit={(isEditing) ? handleUpdate : handleSubmit}>
      <InputActivity type="text" name="activity" value={(isEditing) ? edit.activity : activity} onChange={handleActivity} autoComplete="off" />
      <SubmitButton btnType={(isEditing) ? ButtonType.UPDATE : ButtonType.ADD} />
    </Form>
  )
}
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;