import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'
import { deleteNoteAction, getNotesAction, getSingleNote, setDoneNoteAction } from '../state/action-creators'
import { Payload, State } from '../state/actions'
import { BoxWrapper } from './NotesWrapper'
import { Note } from './Note'
import styled from 'styled-components';
import { PopupType, ToDoForm } from './Forms/ToDoForm'
import { DoneNotesWrapper } from './DoneNotesWrapper'
import { useAlert } from 'react-alert'
// import { connect } from "react-redux";


const Home: React.FC = (): JSX.Element => {
  const data: State = useSelector((state: RootState) => state.notes)
  console.log("notes: ", data);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const alert = useAlert();
  const [edit, setEdit] = useState<Payload>({
    id: null,
    activity: '',
    isDone: null,
  });
  const [done, setDone] = useState<Payload>({
    id: null,
    activity: '',
    isDone: false,
  });
  const { loading, notes } = data
  const dispatch = useDispatch();
  //we need to use dispatch in order to get access to actions-creators functions
  useEffect(() => {
    const retrieveNotes = () => dispatch(getNotesAction());
    retrieveNotes();
  }, [dispatch]);
  const popupMessage = (msg: string, type: PopupType): void => {
    if (PopupType.ADD === type){
      alert.success(msg);
    }else if (PopupType.UPDATE === type){
      alert.info(msg);
    }else if (PopupType.DELETE === type){
      alert.error(msg);
    }else if (PopupType.CHECK === type){
      alert.info(msg);
    }
  }
  const removeActivity = (id: number | null = null) => {
    if (!id) return;
    dispatch(deleteNoteAction(id));
    popupMessage("Task Deleted",PopupType.DELETE)
    console.log('deleted!');
  }
  const editActivity = (id: number | null = null) => {
    if (!id) return;
    const note = notes.find(note => note.id === id);
    if (note) {
      setIsEditing(true);
      setEdit({
        id,
        activity: note.activity,
        isDone: note.isDone,
      })
    }
  }
  const doneActivity = (id: number | null) => {
    if (!id) return;
    // console.log("id: ",id);
    const note = notes.find(note => note.id === id);
    if (note) {
      setIsDone(true);
      setDone({
        id,
        activity: note.activity,
        isDone: true
      })
      dispatch(setDoneNoteAction({
        id: note.id,
        activity: note.activity,
        isDone: true
      }));
      popupMessage("Task Done",PopupType.DELETE)
    }
  }

  const hasDoneElements = () => notes.filter(note => note.isDone).length > 0;

  useEffect(() => {
    if(isDone && done.id){
      const retrieveNotes = (id: number) => dispatch(getSingleNote(id));
      retrieveNotes(done.id);
    }
  },[dispatch, done.id, done.isDone, isDone])

  return (
    <Wrapper>
      <ToDoForm isEditing={isEditing} edit={edit} setIsEditing={setIsEditing} />
      {
        (loading) ? <h2>Loading...</h2> :
          <>
            <BoxWrapper>
              {
                notes.map(note => (!note.isDone) && <Note key={note.id}
                  id={note.id}
                  isDone={note.isDone}
                  activity={note.activity}
                  doneActivity={doneActivity}
                  editActivity={editActivity}
                  removeActivity={removeActivity}
                />)
              }
            </BoxWrapper>
            {
              (hasDoneElements()) && <Separator />
            }
            <DoneNotesWrapper>
              {
                notes.map(note => (note.isDone) && <Note key={note.id}
                  id={note.id}
                  isDone={note.isDone}
                  activity={note.activity}
                  doneActivity={doneActivity}
                  editActivity={editActivity}
                  removeActivity={removeActivity}
                />)
              }
            </DoneNotesWrapper>
          </>
      }
    </Wrapper>
  )
}

const Separator = styled.hr`
  background: #1c1c1c;
  margin: 0.5rem 0;
}
`

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

export default Home;