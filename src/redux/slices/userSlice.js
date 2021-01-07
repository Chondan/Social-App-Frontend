import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

// Other slices
import { setLoading, setErrors } from './uiSlice';

// Utils
import { getFormatErrors, initialErrors } from '../../utils/error';

// User reducer types
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_UNAUTHENTICATED = "SET_UNAUTHENTICATED";
export const SET_USER  = "SET_USER";
export const LOADING_USER = "LOADING_USER";

const fetchUserData = createAsyncThunk(
	`user/fetchUserData`,
	async (data , { getState, dispatch, rejectWithValue }) => {
		try {
			const responseForUserData = await axios({ method: 'get', url: `/user`, headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
			console.log(responseForUserData.data);
			return responseForUserData.data;

		} catch (err) {
			rejectWithValue(err.message);			
		}
	}
)

const fetchAction = (action) => {
	const actionsToPath = {
		login: '/login',
		signup: '/sign-up'
	}
	return createAsyncThunk(
		`user/${action}`,
		async (data, { getState, dispatch, rejectWithValue }) => {
			dispatch(setLoading(true));
			try {
				const responseForToken = await axios({ method: 'post', url: `${actionsToPath[action]}`, data });
				const { token } = responseForToken.data;

				// Do authorization tasks
				localStorage.setItem("token", token);
				// axios.default.headers.common["Authorization"] = `Bearer ${token}`;

				// Fetching user's data
				// dispatch(fetchUserData());

				// Set UI states
				dispatch(setLoading(false));
				dispatch(setErrors(initialErrors)); // reset errors

				return responseForToken.data; // payload

			} catch (err) {
				const payload = getFormatErrors(err);

				// Set UI states
				dispatch(setLoading(false));
				dispatch(setErrors(payload));

				return rejectWithValue(payload); // { errors: { email, password }, error, message }
			}
		}
	);
};

const userSlice = createSlice({
	name: "user",
	initialState: {
		credentials: {},
		likes: [],
		notifications: [],	
	},
	reducers: {
		setUser: (state, action) => {
			state.userHandle = action.payload.userHandle;
		},
	},
	extraReducers: builder => {
		builder
		.addCase(fetchAction("login").fulfilled, (state, action) => {
			console.log("user/fulfilled");

			// redirect to home page
			window.location.href = '/';
		})
		.addCase(fetchAction("signup").fulfilled, (state, action) => {
			console.log("user/fulfilled");
	
			// redirect to home page
			window.location.href = '/';
		})
		.addCase(fetchUserData.fulfilled, (state, action) => {
			Object.keys(action.payload).forEach(key => {
				state[key] = action.payload[key];
			});
		})
	}
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
export { fetchAction, fetchUserData };