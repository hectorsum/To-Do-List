import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { getNotesAction } from '../state/action-creators'
import { State } from '../state/actions'
import { BoxWrapper } from './NotesWrapper'
import { Note } from './Note'
import styled from 'styled-components';
import { ToDoForm } from './Forms/ToDoForm'

export const Home: React.FC = (): JSX.Element => {
  const data: State = useSelector((state: RootState) => state.notes)
  const { loading, notes } = data
  const dispatch = useDispatch();
  useEffect(() => {
    const retrieveNotes = () => dispatch(getNotesAction());
    retrieveNotes();
  }, [dispatch]);
  return (
    <Wrapper>
      <ToDoForm />
      {
        (loading) ? <h2>Loading...</h2> :
          <BoxWrapper>
            {
              notes.map(note => <Note key={note.id} id={note.id} activity={note.activity}/>)
            }
          </BoxWrapper>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 30%;
  margin: 0 auto;
  border:2px solid #ccc;
  padding: 1rem;
  @media (max-width:1024px){
    width: 50%;
  }
  @media (max-width:768px){
    width: 80%;
  }
  @media (max-width:480px){
    width: 100%;
    padding: 0rem;
    border:none;
  }
`;