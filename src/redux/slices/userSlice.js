import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Other slices
import { setLoading, setErrors } from './uiSlice';

// Utils
import { getFormatErrors, initialErrors } from '../../utils/error';
import { getAuthorizationHeader } from '../../utils/auth';

const fetchUserData = createAsyncThunk(
	`user/fetchUserData`,
	async (_, { getState, dispatch, rejectWithValue }) => {
		dispatch(setLoading(true));
		try {
			if (!getState().user.loading && (getState().user.loaded && getState().user.authenticated)) {
				console.log("Already loaded user's data");
				dispatch(setLoading(false));
				return { ...getState().user };
			}
			const responseForUserData = await axios({ method: 'get', url: `/user`, headers: { ...getAuthorizationHeader() } });
			dispatch(setLoading(false));
			return responseForUserData.data;
		} catch (err) {
			dispatch(setLoading(false));
			return rejectWithValue(err.message);			
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
		async ({ data, history  }, { getState, dispatch, rejectWithValue }) => {
			dispatch(setLoading(true));
			try {
				const responseForToken = await axios({ method: 'post', url: `${actionsToPath[action]}`, data });
				const { token } = responseForToken.data;

				// Do authorization tasks
				localStorage.setItem("token", token);

				// Set UI states
				dispatch(setLoading(false));
				dispatch(setErrors(initialErrors)); // reset errors

				// Fetch User's Data
				dispatch(fetchUserData());

				// Redirect to home's page
				history.push('/');

				return responseForToken.data; // payload

			} catch (err) {
				const payload = getFormatErrors(err);

				// Set UI states
				dispatch(setLoading(false));
				dispatch(setErrors(payload));

				return rejectWithValue(payload); // { email, password, handle, error, message }
			}
		}
	);
};

const fetchUploadImage = createAsyncThunk(
	`user/fetchUploadImage`,
	async (formData, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios({ method: 'post', url: '/user/image', data: formData, headers: { ...getAuthorizationHeader() } });
			dispatch(fetchUserData());

			return response.data;

		} catch (err) {
			const payload = getFormatErrors(err);

			// Set UI states
			dispatch(setErrors(payload));

			return rejectWithValue(payload);
		}
	}
)

const fetchEditUserDetails = createAsyncThunk(
	`user/fetchEditUserDetails`,
	async (data, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios({ method: 'post', url: '/user', data, headers: { ...getAuthorizationHeader() } });
			dispatch(fetchUserData());

			return response.data;
		} catch (err) {
			const payload = getFormatErrors(err);

			// Set UI states
			dispatch(setErrors(payload));

			return rejectWithValue(payload);
		}
	}
)

const initialState = {
	credentials: {},
	likes: [],
	notifications: [],	
	loaded: false,
	authenticated: false,
	loading: false
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.userHandle = action.payload.userHandle;
		},
		setAuthenticated: (state, action) => {
			state.authenticated = true;
		},
		resetUserData: (state, action) => {
			localStorage.removeItem("token");
			console.log("LOGGED OUT");
			return initialState;
		}
	},
	extraReducers: builder => {
		builder
		.addCase(fetchAction("login").fulfilled, (state, action) => {
			state.authenticated = true;
		})
		.addCase(fetchAction("signup").fulfilled, (state, action) => {
			state.authenticated = true;
		})
		.addCase(fetchUserData.pending, (state, action) => {
			state.loading = true;
		})
		.addCase(fetchUserData.fulfilled, (state, action) => {
			if (!action.payload) return initialState;
			Object.keys(action.payload).forEach(key => {
				state[key] = action.payload[key];
			});
			state.loaded = true;
			state.authenticated = true;
			state.loading = false;
		})
		.addCase(fetchUserData.rejected, (state, action) => {
			return initialState;
		})
		.addCase(fetchUploadImage.pending, (state, action) => {
			state.loading = true;
		})
		.addCase(fetchEditUserDetails.pending, (state, action) => {
			state.loading = true;
		})
		.addCase(fetchEditUserDetails.fulfilled, (state, action) => {
			console.log('fulfilled: ', action.payload);
		})
		.addCase(fetchEditUserDetails.rejected, (state, action) => {
			console.log('rejected: ', action.payload);
		})
	}
});

// Selectors
const selectUserData = state => state.user;

const { actions, reducer } = userSlice;
export const { setUser, setAuthenticated, resetUserData } = actions;
export default reducer;
export { fetchAction, fetchUserData, selectUserData, fetchUploadImage, fetchEditUserDetails };