import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import { CreateNote } from './components/CreateNote';
import { Home } from './components/Home';
import { store } from './state/store';
function App() {
  return (
    <Provider store={store}>
      <div className="wrapper">
        <h1>To - Do List</h1>
        <hr />
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/create-note' component={CreateNote} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
