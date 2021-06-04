import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
	name: "user",
	initialState: {
		loading: false,
		profile: null,
		updateProfileError: null,
		profileError: null,
		updateSuccess: false,
		myOrders: [],
		usersListLoading: false,
		users: [],
		fetchUsersError: null,
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
			state.updateSuccess = true;
			state.updateProfileError = null;
		},
		setUpdateProfileFailed: (state, { payload }) => {
			state.loading = false;
			state.updateSuccess = false;
			state.updateProfileError = payload;
		},
		setMyOrders: (state, { payload }) => {
			state.loading = false;
			state.myOrders = payload;
		},
		setUserListLoading: (state) => {
			state.usersListLoading = true;
		},
		setUsersList: (state, { payload }) => {
			state.usersListLoading = false;
			state.users = payload;
			state.fetchUsersError = null;
		},
		setUserListFailed: (state, { payload }) => {
			state.usersListLoading = false;
			state.users = [];
			state.fetchUsersError = payload;
		},
	},
});

const {
	setLoading,
	setUserProfile,
	setUserProfileFailed,
	setUpdateProfileSuccess,
	setUpdateProfileFailed,
	setMyOrders,
	setUserListLoading,
	setUsersList,
	setUserListFailed
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

export const getMyOrders = () => async (dispatch, getState) => {
	const token = getState().authReducer?.userInfo?.token;

	try {
		dispatch(setLoading(true));

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get("/api/orders/myOrders", config);

		dispatch(setMyOrders(data));
	} catch (error) {
		console.error(error);
	}
};

export const fetchAllUsers = () => async (dispatch, getState) => {
	const token = getState().authReducer?.userInfo?.token;

	try {
		dispatch(setUserListLoading());

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const { data } = await axios.get("/api/users", config);

		dispatch(setUsersList(data));
	} catch (error) {
		console.error(error);
		dispatch(
			setUserListFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export default userSlice.reducer;
