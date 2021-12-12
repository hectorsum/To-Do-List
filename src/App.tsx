import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <div className="wrapper">
      <h1>To - Do List</h1>
      <hr />
      <Router>
        <Switch>
            <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
