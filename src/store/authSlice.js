import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	sessionId: null,
	success: false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login(state, action) {
			state.sessionId = action.payload.sessionId;
			state.success = action.payload.success;
		},

		logout(state) {
			state.sessionId = null;
			state.success = false;
		}
	}
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
