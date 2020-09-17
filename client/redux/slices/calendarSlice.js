/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = process.env.API_URL || 'http://localhost:5000';

// Fetches data from the server
export const fetchEvents = createAsyncThunk('calendar/fetchEvents', async () => {
  const response = await axios.get(`${baseURL}/api/events`);
  return response.data.data;
});
// Posts data to server and then re fetches the updated database
export const postEvents = createAsyncThunk('calendar/postEvents', async (event, { getState }) => {
  const { currentUser } = getState().calendar;
  await axios.post(`${baseURL}/api/events`, { id: nanoid(), user: currentUser, ...event.added });
  const response = await axios.get(`${baseURL}/api/events`);
  return response.data.data;
});
export const updateEvents = createAsyncThunk('calendar/updateEvents', async (event) => {
  const id = Object.keys(event.changed)[0];
  await axios.patch(`${baseURL}/api/events/${id}`, { ...event.changed });
  const response = await axios.get(`${baseURL}/api/events`);
  return response.data.data;
});
export const deleteEvents = createAsyncThunk('calendar/deleteEvents', async (event) => {
  const deletedId = event.id;
  await axios.delete(`${baseURL}/api/events/${deletedId}`);
  const response = await axios.get(`${baseURL}/api/events`);
  return response.data.data;
});

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    toolTipVisibility: {},
    currentUser: 'User 1',
    status: 'idle',
    error: null,
    calendarEvents: [],
  },
  reducers: {
    changeVisibility: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers using immer
      state.toolTipVisibility[action.payload.id] = action.payload.bool;
    },
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  // Extra reducers are handing 3 action types "pending, fullfilled, rejected" created by each createAsyncThunk
  // Based on the action type it is setting the status & calenderEvents in the redux state
  extraReducers: {
    [fetchEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.calendarEvents = [...action.payload];
    },
    [fetchEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [postEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [postEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.calendarEvents = [...action.payload];
    },
    [postEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [updateEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [updateEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.calendarEvents = [...action.payload];
    },
    [updateEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [deleteEvents.pending]: (state, action) => {
      state.status = 'loading';
    },
    [deleteEvents.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.calendarEvents = [...action.payload];
    },
    [deleteEvents.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { changeVisibility, changeCurrentUser } = calendarSlice.actions;

export default calendarSlice.reducer;
