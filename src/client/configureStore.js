import {
        createStore,
        applyMiddleware        
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';

export default function configureStore(initialState) {
    const store = createStore(
            rootReducer,
            applyMiddleware(
                 thunkMiddleware
                 )
             );
      
    // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
    if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      module.hot.accept('./rootReducer', () => {
        const nextRootReducer = require('./rootReducer').default;
        store.replaceReducer(nextRootReducer);
      });
    }

  return store;
}