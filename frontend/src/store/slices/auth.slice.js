import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "auth",
	initialState: {
		authenticated: false,
	},
	reducers: {
		setProfile: (state, { payload }) => {
			state.profile = payload;
		},
	},
});

// const { setProfile } = authSlice.actions;

// export const

export default authSlice.reducer;
