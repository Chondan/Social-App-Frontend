import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

// Slices 
import { updateLikes, updateUnlike } from './userSlice';
import { setLoading as setLoadingUI, setErrors } from './uiSlice';

// Utils
import { getAuthorizationHeader } from '../../utils/auth';
import { getFormatErrors, initialErrors } from '../../utils/error';

// EntityAdapter
const screamsAdapter = createEntityAdapter({
	selectId: scream => scream.screamId,
	sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt)
});
const initialState = screamsAdapter.getInitialState({
	loading: false,
	loaded: false
});

const fetchScreams = createAsyncThunk(
	`scream/fetchScreams`,
	async (_, { getState, rejectWithValue }) => {
		try {
			// ---- NEED TO BE REMOVED TO GET SCREAMS UPDATED
			if (getState().screams.loaded) {
				throw new Error("Already loaded");
			}
			const response = await axios({ method: 'get', url: '/screams' });

			return response.data;
		} catch(err) {
			return rejectWithValue(err.message || err.response.data);
		}
	}
);

const fetchLikeScream = createAsyncThunk(
	`scream/fetchLikeScream`,
	async (screamId, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios({ method: 'post', url: `/scream/${screamId}/like`, headers: { ...getAuthorizationHeader() } });
			// Update user's likes
			const scream = { ...response.data, screamId };
			dispatch(updateLikes(scream));
			return scream;
		} catch(err) {
			return rejectWithValue(err.message || err.response.data);
		}	
	}
)

const fetchUnlikeScream = createAsyncThunk(
	`scream/fetchUnlikeScream`,
	async (screamId, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios({ method: 'post', url: `/scream/${screamId}/unlike`, headers: { ...getAuthorizationHeader() } });
			// Update user's likes
			const scream = { ...response.data, screamId };
			dispatch(updateUnlike(scream));
			return scream;
		} catch(err) {
			return rejectWithValue(err.message || err.response.data);
		}	
	}
)

const fetchDeleteScream = createAsyncThunk(
	`scream/fetchDeleteScream`,
	async ({ screamId, needToReload }, { rejectWithValue }) => {
		try {
			const response = await axios({ method: 'delete', url: `/scream/${screamId}`, headers: { ...getAuthorizationHeader() } });
			console.log(response.data);
			if (needToReload) window.location.href = `/scream/${screamId}`;
			return screamId;
		} catch(err) {
			console.log(err);
			return rejectWithValue(err.message || err.response.data);
		}
	}
)

const fetchPostScream = createAsyncThunk(
	`scream/fetchPostScream`,
	async (body, { dispatch, rejectWithValue }) => {
		dispatch(setLoadingUI(true));
		dispatch(setErrors(initialErrors));
		try {

			if (!body) {
				dispatch(setLoadingUI(false));
				dispatch(setErrors({ message: "Cannot post an empty scream" }));
				return rejectWithValue({ message: "Cannot post an empty scream" });
			}

			const response = await axios({ method: 'post', url: `/scream`, data: { body }, headers: { ...getAuthorizationHeader() } });

			// Update UI State
			dispatch(setLoadingUI(false));
			dispatch(setErrors(initialErrors));

			return response.data;
		} catch(err) {

			// Update UI State
			dispatch(setLoadingUI(false));
			dispatch(setErrors(getFormatErrors(err)));

			return rejectWithValue(getFormatErrors(err));
		}
	}
)

const screamSlice = createSlice({
	name: 'screams',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		updateComment: (state, action) => {
			state.entities[action.payload].commentCount += 1;
		}
	},
	extraReducers: builder => {
		builder
		.addCase(fetchScreams.pending, (state, action) => {
			console.log("screams/fetchScreams/pending");
			state.loading = true;
		})
		.addCase(fetchScreams.fulfilled, (state, action) => {
			console.log("screams/fetchScreams/fulfilled");
			state.loading = false;
			state.loaded = true;
			// SET SCREAMS
			screamsAdapter.setAll(state, action.payload);
		})
		.addCase(fetchScreams.rejected, (state, action) => {
			console.log("screams/fetchScreams/rejected");
			state.loading = false;
		})
		.addCase(fetchLikeScream.fulfilled, (state, action) => {
			// UPDATE NUMBER OF LIKE OF THAT SCREAM (ACTUALLY UPDATE THE WHOLE SCREAM)
			state.entities[action.payload.screamId] = action.payload;
		})
		.addCase(fetchUnlikeScream.fulfilled, (state, action) => {
			// UPDATE NUMBER OF LIKE OF THAT SCREAM (ACTUALLY UPDATE THE WHOLE SCREAM)
			state.entities[action.payload.screamId] = action.payload;
		})
		.addCase(fetchDeleteScream.fulfilled, (state, action) => {
			// UPDATE SCREMS
			screamsAdapter.removeOne(state, action.payload);
		})
		.addCase(fetchPostScream.pending, (state, action) => {
			console.log("screams/fetchPostScream/pending");
		})
		.addCase(fetchPostScream.fulfilled, (state, action) => {
			console.log("screams/fetchPostScream/fulfilled");
			screamsAdapter.addOne(state, action.payload);
		})
		.addCase(fetchPostScream.rejected, (state, action) => {
			console.log("screams/fetchPostScream/rejected");
		})
	}
});

const { actions, reducer } = screamSlice;
// Reducer
export default reducer;
// Actions
export const { updateComment } = actions;
export { fetchScreams, fetchLikeScream, fetchUnlikeScream, fetchDeleteScream, fetchPostScream };
// Selectors
export const {
	selectAll: selectScreams,
	selectById: selectScreamById
} = screamsAdapter.getSelectors(state => state.screams);
export const selectScreamsByUserHandle = (userHandle) => {
	return createSelector(
		selectScreams,
		screams => screams.filter(scream => scream.userHandle === userHandle)
	)
};