import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { deleteNoteAction, getNotesAction } from '../state/action-creators'
import { Payload, State } from '../state/actions'
import { BoxWrapper } from './NotesWrapper'
import { Note } from './Note'
import styled from 'styled-components';
import { ToDoForm } from './Forms/ToDoForm'

const getLocalStorage = () => {
  let list = localStorage.getItem("activity");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list") || "{}"));
  } else {
    return [];
  }
};

export const Home: React.FC = (): JSX.Element => {
  const data: State = useSelector((state: RootState) => state.notes)
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [edit, setEdit] = useState<Payload>({
    id:null,
    activity:'',
  });
  const { loading, notes } = data
  const dispatch = useDispatch();
  //we need to use dispatch in order to get access to actions-creators functions
  useEffect(() => {
    const retrieveNotes = () => dispatch(getNotesAction());
    retrieveNotes();
  }, [dispatch]);
  const removeActivity = (id:number | null = null) => {
    if (!id) return;
    dispatch(deleteNoteAction(id));
    console.log('deleted!');
  }
  const editActivity = (id:number | null = null) => {
    if (!id) return;
    const note = notes.find(note => note.id === id);
    if(note){
      setIsEditing(true);
      setEdit({
        id,
        activity: note.activity
      })
    }
  }

  return (
    <Wrapper>
      <ToDoForm isEditing={isEditing} edit={edit} setIsEditing={setIsEditing}/>
      {
        (loading) ? <h2>Loading...</h2> :
          <BoxWrapper>
            {
              notes.map(note => <Note key={note.id} 
                                      id={note.id} 
                                      activity={note.activity}
                                      editActivity={editActivity}
                                      removeActivity={removeActivity}
                                      />)
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