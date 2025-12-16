import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	isAuthenticated: false
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			const { uid, email } = action.payload;
			state.user = { uid, email }
			state.isAuthenticated = true;
		},
		logout(state) {
			state.user = null;
			state.isAuthenticated = false;
		},
	}
});

export const {
	login,
	logout
} = authSlice.actions;
export default authSlice.reducer;
