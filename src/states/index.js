import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import usersReducer from './users/reducer';
import authUserReducer from './authUser/reducer';
import leaderboardsReducer from './leaderboards/reducer';
import threadsReducer from './threads/reducer';
import detailThreadReducer from './detailThread/reducer';
import isPreloadReducer from './isPreload/reducer';
import categoriesReducer from './categories/reducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    authUser: authUserReducer,
    leaderboards: leaderboardsReducer,
    isPreload: isPreloadReducer,
    loadingBar: loadingBarReducer,
    threads: threadsReducer,
    detailThread: detailThreadReducer,
    categories: categoriesReducer,
  },
});

export default store;
