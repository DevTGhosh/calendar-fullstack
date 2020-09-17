import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from '../slices/calendarSlice';

export default configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
