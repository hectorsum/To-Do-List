import styled from 'styled-components';
import { AiFillEdit, AiFillCheckCircle, AiFillDelete } from 'react-icons/all';
import { ButtonType } from './Types';
// import { useDispatch } from 'react-redux';
// import { deleteNoteAction } from '../state/action-creators';
// import { Payload } from '../state/actions';
// import { useEffect, useState } from 'react';
interface Props {
  activity: string,
  id: number | null,
  editActivity: (id: number | null) => void,
  removeActivity: (id: number | null) => void,
}

export const Note: React.FC<Props> = ({ activity, id, editActivity, removeActivity }): JSX.Element => {
  return (
    <NoteCard>
      <ActivityText>{activity}</ActivityText>
      <ButtonWrapper>
        <ButtonAction href="#" type={ButtonType.ADD}><AiFillCheckCircle /></ButtonAction>
        <ButtonAction href="#" type={ButtonType.UPDATE} onClick={() => editActivity(id)}><AiFillEdit /></ButtonAction>
        <ButtonAction href="#" type={ButtonType.DELETE} onClick={() => removeActivity(id)}><AiFillDelete /></ButtonAction>
      </ButtonWrapper>
    </NoteCard>
  )
}

const ActivityText = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonAction = styled.a`
  padding: 0.5rem;
  display:flex;
  justify-content: center;
  align-items: center;
  font-size: 110%;
`;

const NoteCard = styled.div`
  background: whitesmoke;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;