import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		authenticated: false,
		loading: false,
		userInfo: null,
		loginError: null,
	},
	reducers: {
		setAuthenticating: (state) => {
			state.loading = true;
		},
		setLoginSuccess: (state, { payload }) => {
			state.loading = false;
			state.authenticated = true;
			state.userInfo = payload;
			state.loginError = null;
		},
		setLoginFailed: (state, { payload }) => {
			state.loading = false;
			state.loginError = payload;
			state.userInfo = null;
		},
		setUserProfile: (state, { payload }) => {
			state.profile = payload;
		},
		setLogout: (state) => {
			state = {
				authenticated: false,
				loading: false,
				userInfo: null,
				loginError: null,
			};
		},
	},
});

const {
	setUserProfile,
	setAuthenticating,
	setLoginFailed,
	setLoginSuccess,
	setLogout,
} = authSlice.actions;

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch(setAuthenticating(true));

		const reqBody = JSON.stringify({ email, password });
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		const { data } = await axios.post("/api/users/login", reqBody, config);

		dispatch(setLoginSuccess(data));
	} catch (error) {
		console.error(error);
		dispatch(
			setLoginFailed(
				error?.response?.data?.message
					? error.response.data.message
					: error.message
			)
		);
	}
};

export default authSlice.reducer;
