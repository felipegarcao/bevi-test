import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducers/authentication-user-reducer'
import {persistReducer, persistStore} from 'redux-persist'

const persistConfig = {
  key: 'bevi-test',
  version: 3,
  storage
}

const reducer = combineReducers({
  user: userReducer,
})

const persistedReducers = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: {
    persistedReducers,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

export const persistor = persistStore(store)


export type RootState = ReturnType<typeof store.getState>