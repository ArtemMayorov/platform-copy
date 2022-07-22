import { configureStore } from '@reduxjs/toolkit';

import articlesReducer from './Slices/articlesSlice';
import userSlice from './Slices/userSlice';

const store = configureStore({
  reducer: {
    articlesList: articlesReducer,
    user: userSlice,
  },
});
export default store;
