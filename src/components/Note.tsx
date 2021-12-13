import styled, {css} from 'styled-components';
import { AiFillEdit, AiFillCheckCircle, AiFillDelete } from 'react-icons/all';
import { ButtonType } from './Types';
// import { useDispatch } from 'react-redux';
// import { deleteNoteAction } from '../state/action-creators';
// import { Payload } from '../state/actions';
// import { useEffect, useState } from 'react';
interface Props {
  activity: string,
  id: number | null,
  isDone: boolean | null
  doneActivity: (id: number | null) => void,
  editActivity: (id: number | null) => void,
  removeActivity: (id: number | null) => void,
}

export const Note: React.FC<Props> = ({ activity, id, isDone, doneActivity, editActivity, removeActivity }): JSX.Element => {
  return (
    <NoteCard isDone={isDone}>
      <ActivityText>{activity}</ActivityText>
      <ButtonWrapper>
        {
          (!isDone) && (
            <>
              <ButtonAction href="#" type={ButtonType.ADD} onClick={() => doneActivity(id)}><AiFillCheckCircle /></ButtonAction>
              <ButtonAction href="#" type={ButtonType.UPDATE} onClick={() => editActivity(id)}><AiFillEdit /></ButtonAction>
            </>
          )
        } 
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
  ${(props:any) => (props.type === ButtonType.ADD) && css`
    color: #71B874;
  `};
  ${(props:any) => (props.type === ButtonType.UPDATE) && css`
    color: #F7AB31;
  `};
  ${(props:any) => (props.type === ButtonType.DELETE) && css`
    color: #EF645B;
  `};
`;

const NoteCard = styled.div`
  ${(props: any) => (props.isDone) ? css`
    background: #a0eca4;
    border: 1px solid #424242;
    margin: 0.2rem 0;
  ` :  css`
    background: whitesmoke;
    border: 1px solid #ccc;
    margin: 0.2rem 0;
  `
  }
  border-radius:5px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
`;
const ButtonWrapper = styled.div`
  display: flex;
`;