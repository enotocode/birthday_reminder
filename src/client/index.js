import React from 'react'
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
        BrowserRouter as Router,
        Route
} from 'react-router-dom';
import { setEndpointHost, setEndpointPath, setAccessToken, setHeaders } from 'redux-json-api';

import configureStore from './configureStore';
const store = configureStore();

store.dispatch(setEndpointHost('http://localhost:8080'));
store.dispatch(setEndpointPath('/api/v1'));

document.store=store;

// Save a reference to the root element for reuse
const rootEl = document.getElementById("root");

import App from './components/App';


ReactDOM.render(
        <Provider store={store}>
                <Router>
                    <div>
                        <App/>
                    </div>
                </Router>
            </Provider>,
        document.getElementById('root')
                );