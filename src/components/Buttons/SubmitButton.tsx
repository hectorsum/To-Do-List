import styled, {css} from 'styled-components';
import { ButtonType, Type } from '../Types';

export const SubmitButton:React.FC<Type> = ({btnType})=> {
  return (
    <Button type="submit" btnType={btnType}>
      {
        (btnType.toUpperCase() === ButtonType.ADD) && <span>Add Note</span>
      }
      {
        (btnType.toUpperCase() === ButtonType.UPDATE) && <span>Update Note</span>
      }
      {
        (btnType.toUpperCase() === ButtonType.DELETE) && <span>Delete Note</span>
      }
    </Button>
  )
}

const Button = styled.button`
  ${(props:Type) => (props.btnType.toUpperCase() === ButtonType.ADD) && css`
    background-color: #2eb635;
    &:hover{
      background-color: #2eb635;
    }
    &:focus{
      background-color: #2eb635;
    }
  `};
  ${(props:Type) => (props.btnType.toUpperCase() === ButtonType.UPDATE) && css`
    background-color: #bdbd45;
    &:hover{
      background-color: #bdbd45bc;
    }
    &:focus{
      background-color: #bdbd45;
    }
  `};
  ${(props:Type) => (props.btnType.toUpperCase() === ButtonType.DELETE) && css`
    background-color: #c03d3d;
    &:hover{
      background-color: #c03d3dce;
    }
    &:focus{
      background-color: #c03d3d;
    }
  `};
  padding: 1rem;
  border-radius: 5px;
  border: 1px solid #222;
  font-weight: bold;
  cursor:pointer;
  transition: all 0.3s ease;
  margin-bottom: 0.5rem;
  color: #fff;
  &:hover{
    box-shadow: 0 0 0 3px rgba(0, 0, 0,0.2);
  }
  &:focus{
    transform: scale(1.02);
    border: 1px solid #222;
    box-shadow: 0 0 0 3px rgba(0, 0, 0,0.2);
  }
`;