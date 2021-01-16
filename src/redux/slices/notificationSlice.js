import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utils
import { getAuthorizationHeader } from '../../utils/auth';
import { getFormatErrors } from '../../utils/error';

// Slices
import { markNotificationAsRead } from './userSlice';

const fetchMarkNotificationAsRead = createAsyncThunk(
	`notification/fetchMarkNotificationAsRead`,
	async (notificationId, { getState, dispatch, rejectWithValue }) => {
		try {
			const noti = getState().user.notifications.find(noti => noti.notificationId === notificationId);
			if (!noti) return rejectWithValue("No notification found");
			if (noti.read) return rejectWithValue("Already Mark as read");
			const response = await axios({ method: 'put', url: '/notifications', data: { notifications: Array(1).fill(notificationId) }, headers: { ...getAuthorizationHeader() } });
			dispatch(markNotificationAsRead(notificationId));
			return response.data;
		} catch(err) {
			return rejectWithValue(getFormatErrors(err));
		}
	}
)

const notificationSlice = createSlice({
	name: 'notification',
	initialState: {
		loading: false
	},
	extraReducers: builder => {
		builder
		.addCase(fetchMarkNotificationAsRead.fulfilled, (state, action) => {
			console.log('notification/fetchMarkNotificationAsRead', action.payload);
		})
		.addCase(fetchMarkNotificationAsRead.rejected, (state, action) => {
			console.log('notification/fetchMarkNotificationAsRead', action.payload);
		})
	}
});

const { reducer } = notificationSlice;
export default reducer;
export { fetchMarkNotificationAsRead };