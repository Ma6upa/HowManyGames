import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authRegAPI } from "./api/authRegApi";
import { gamesAPI } from "./api/gamesApi";
import { developerAPI } from "./api/developerApi";
import { publisherAPI } from "./api/publisherApi";
import userReducer from './reducers/UserSlice'
import { userAPI } from "./api/userApi";
import { GlobalStatisticAPI } from "./api/statisticsApi";
import { FiltersAndConstsAPI } from "./api/filterAndConsts";
import { searchAPI } from "./api/searchApi";
import { pictureAPI } from "./api/pictureApi";
import { reviewAPI } from "./api/reviewApi";
import { personGameAPI } from "./api/personGameApi";
import { tagsAPI } from "./api/tagsApi";
import { genresAPI } from "./api/genresApi";
import { platformsAPI } from "./api/platformsApi";

const rootReducer = combineReducers({
  userReducer,
  [authRegAPI.reducerPath]: authRegAPI.reducer,
  [gamesAPI.reducerPath]: gamesAPI.reducer,
  [developerAPI.reducerPath]: developerAPI.reducer,
  [publisherAPI.reducerPath]: publisherAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [GlobalStatisticAPI.reducerPath]: GlobalStatisticAPI.reducer,
  [FiltersAndConstsAPI.reducerPath]: FiltersAndConstsAPI.reducer,
  [searchAPI.reducerPath]: searchAPI.reducer,
  [pictureAPI.reducerPath]: pictureAPI.reducer,
  [reviewAPI.reducerPath]: reviewAPI.reducer,
  [personGameAPI.reducerPath]: personGameAPI.reducer,
  [tagsAPI.reducerPath]: tagsAPI.reducer,
  [genresAPI.reducerPath]: genresAPI.reducer,
  [platformsAPI.reducerPath]: platformsAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authRegAPI.middleware)
    .concat(gamesAPI.middleware)
    .concat(developerAPI.middleware)
    .concat(publisherAPI.middleware)
    .concat(userAPI.middleware)
    .concat(GlobalStatisticAPI.middleware)
    .concat(FiltersAndConstsAPI.middleware)
    .concat(searchAPI.middleware)
    .concat(pictureAPI.middleware)
    .concat(reviewAPI.middleware)
    .concat(personGameAPI.middleware)
    .concat(tagsAPI.middleware)
    .concat(genresAPI.middleware)
    .concat(platformsAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
