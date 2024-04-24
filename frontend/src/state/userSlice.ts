import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: null,
		alias: "",
		loggedIn: false,
		kind: "",
	},
	reducers: {
		unset: (state) => {
			state.id = null;
			state.alias = "";
			state.loggedIn = false;
			state.kind = "";
		},
		set: (state, action) => {
			state.loggedIn = true;
			state.id = action.payload.id;
			state.alias = action.payload.alias;
			state.kind = action.payload.kind;
		}
	}
})

export const {unset, set} = userSlice.actions;
export default userSlice.reducer;
