import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../containers/shared/Auth/module/reducer';
import homeReducer from '../containers/client/Home/module/reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({ authReducer, homeReducer });

// const store = createStore(
//   rootReducer,
//   /* preloadedState, */ composeEnhancers(applyMiddleware(thunk))
// );
// // const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authReducer', 'homeReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);
export { store, persistor };
