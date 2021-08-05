import {BrowserRouter as Router, Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import { Home } from './components/Home';
function App() {
  return (
    <div className="wrapper">
      <h1>To - Do List</h1>
      <hr />
      <Router>
        <Route exact path='/' component={Home}/>
      </Router>
    </div>
  );
}

export default App;
