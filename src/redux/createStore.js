import { configureStore, combineReducers } from '@reduxjs/toolkit';
import redirectMiddleware from './middlewares/redirectMiddleware';
import authReducer from './modules/auth/authReducer';


export default function createStore({ apiClient, toast, preloadedState = {} }) {
  const store = configureStore({
    preloadedState,
    devTools: process.env.NODE_ENV === 'development',
    reducer: combineReducers({
      auth: authReducer,
    }),
    middleware: getDefaultMiddleware => [
      redirectMiddleware,
      ...getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
        thunk: {
          extraArgument: {
            apiClient,
            toast
          },

        },
      }),
    ],
  });

  return store;
}
