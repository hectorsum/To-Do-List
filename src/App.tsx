import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { NoteContext } from './components/NoteContext';
import { Payload } from './state/actions';

const getCopy = () => {
  const data = localStorage.getItem('activity')
  return data;
}

function App() {
  // const [value, setValue] = useState<Payload>(getCopy)
  console.log(getCopy());
  return (
    <div className="wrapper">
      <h1>To - Do List</h1>
      <hr />
      <Router>
        <Switch>
          {/* <NoteContext.Provider value={}> */}
            <Route exact path='/' component={Home} />
          {/* </NoteContext.Provider> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
