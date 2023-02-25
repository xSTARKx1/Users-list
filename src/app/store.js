import { configureStore } from '@reduxjs/toolkit';
import UserReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    users: UserReducer,
  },
});
