import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import moviesReducer from './reducers';

ReactDOM.render(
    <Provider store={createStore(moviesReducer, applyMiddleware(reduxThunk))}>
        <App />
    </Provider>
    , document.getElementById('root')
);
