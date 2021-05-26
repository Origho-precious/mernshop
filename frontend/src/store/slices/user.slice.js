import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		profile: null,
		updateProfileError: null,
		profileError: null,
	},
	reducers: {
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
		setUserProfile: (state, { payload }) => {
			state.loading = false;
			state.profile = payload;
			state.updateProfileError = null;
		},
		setUserProfileFailed: (state, { payload }) => {
			state.loading = false;
			state.profileError = payload;
		},
		setUpdateProfileSuccess: (state, { payload }) => {
			state.loading = false;
			state.profile = payload;
			state.updateProfileError = null;
		},
		setUpdateProfileFailed: (state, { payload }) => {
			state.loading = false;
			state.updateProfileError = payload;
		},
	},
});

const {
	setLoading,
	setUserProfile,
	setUserProfileFailed,
	setUpdateProfileSuccess,
	setUpdateProfileFailed,
} = userSlice.actions;

export const clearState = () => (dispatch) => {
	dispatch(setUserProfile(null));
};

export const fetchProfile = () => async (dispatch, getState) => {
	const token = getState().authReducer?.userInfo?.token;

	try {
		dispatch(setLoading(true));

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get("/api/users/profile", config);

		data && dispatch(setUserProfile(data));
	} catch (error) {
		console.error(error);
		dispatch(
			setUserProfileFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export const updateProfile = (user) => async (dispatch, getState) => {
	const token = getState().authReducer?.userInfo?.token;

	try {
		dispatch(setLoading(true));

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.patch(
			"/api/users/profile",
			JSON.stringify(user),
			config
		);

		data && dispatch(setUpdateProfileSuccess());
	} catch (error) {
		console.error(error);
		dispatch(
			setUpdateProfileFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export default userSlice.reducer;
