import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: null,
		alias: "",
		loggedIn: false,
	},
	reducers: {
		unset: (state) => {
			state.id = null;
			state.alias = "";
			state.loggedIn = false;
		},
		set: (state, action) => {
			state.loggedIn = true;
			state.id = action.payload.id;
			state.alias = action.payload.alias;
		}
	}
})

export const {unset, set} = userSlice.actions;
export default userSlice.reducer;
