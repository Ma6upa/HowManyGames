import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authRegAPI } from "./api/authRegApi";
import { gamesAPI } from "./api/gamesApi";
import { developerAPI } from "./api/developerApi";
import { publisherAPI } from "./api/publisherApi";
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  userReducer,
  [authRegAPI.reducerPath]: authRegAPI.reducer,
  [gamesAPI.reducerPath]: gamesAPI.reducer,
  [developerAPI.reducerPath]: developerAPI.reducer,
  [publisherAPI.reducerPath]: publisherAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authRegAPI.middleware)
    .concat(gamesAPI.middleware)
    .concat(developerAPI.middleware)
    .concat(publisherAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
