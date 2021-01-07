import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../slices/uiSlice';
import userReducer from '../slices/userSlice';

export default configureStore({
	reducer: {
		ui: uiReducer,
		user: userReducer
	}
});