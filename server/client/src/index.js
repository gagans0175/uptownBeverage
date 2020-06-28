import ReactDOM from 'react-dom';
import reduxThunk from 'redux-thunk';
import routeProvider from './routeProvider';
import configureStore from './store';
import createRoutes from './routes';
import reducers from './reducers';
import * as serviceWorker from './serviceWorker';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
window.axios = axios;

const initialState = {};
const store = configureStore(initialState, reducers, reduxThunk);
ReactDOM.render(routeProvider(store, createRoutes()), document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();