import { combineReducers } from 'redux';

// Authentication
import AuthenticationReducer from './Authentication/reducers';

import { reducer as api } from 'redux-json-api';

const rootReducer = combineReducers({
    AuthenticationReducer,
    api,
});

export default rootReducer;