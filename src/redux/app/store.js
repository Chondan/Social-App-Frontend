import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../slices/uiSlice';
import userReducer from '../slices/userSlice';
import screamReducer from '../slices/screamSlice';
import notificationReducer from '../slices/notificationSlice';

export default configureStore({
	reducer: {
		ui: uiReducer,
		user: userReducer,
		screams: screamReducer,
		notification: notificationReducer
	}
});