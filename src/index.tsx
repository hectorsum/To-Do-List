import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './state';
import { positions, Provider as ProviderAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.TOP_CENTER
};

ReactDOM.render(
  <Provider store={store}>
    <ProviderAlert template={AlertTemplate} {...options}>
      <App />
    </ProviderAlert>
  </Provider>
  ,
  document.getElementById('root')
);