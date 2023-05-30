import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authRegAPI } from "./api/authRegApi";
import { gamesAPI } from "./api/gamesApi";

const rootReducer = combineReducers({
  [authRegAPI.reducerPath]: authRegAPI.reducer,
  [gamesAPI.reducerPath]: gamesAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authRegAPI.middleware).concat(gamesAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
