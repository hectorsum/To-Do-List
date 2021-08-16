import styled from 'styled-components';
import { AiFillEdit, AiFillCheckCircle, AiFillDelete } from 'react-icons/all';
import { ButtonType } from './Types';
import { useDispatch } from 'react-redux';
import { deleteNoteAction } from '../state/action-creators';
import { Payload } from '../state/actions';
interface Props {
  activity: string,
  id: number | null,
}
export const Note: React.FC<Props> = ({ activity, id }): JSX.Element => {
  //we need to use dispatch in order to get access to actions-creators functions
  const dispatch = useDispatch();
  const handleDelete = (id: number | null) => {
    if (!id) return;
    dispatch(deleteNoteAction(id));
  }
  const setCopy = (data: Payload): void => {
    localStorage.setItem('activity',JSON.stringify(data));
  }
  return (
    <NoteCard>
      <ActivityText>{activity}</ActivityText>
      <ButtonWrapper>
        <ButtonAction href="#" type={ButtonType.ADD}><AiFillCheckCircle /></ButtonAction>
        <ButtonAction href="#" type={ButtonType.UPDATE} onClick={() => setCopy({id, activity})}><AiFillEdit /></ButtonAction>
        <ButtonAction href="#" type={ButtonType.DELETE} onClick={() => handleDelete(id)}><AiFillDelete /></ButtonAction>
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