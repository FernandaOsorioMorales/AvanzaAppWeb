import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"

const store = configureStore({
	reducer: {
		user: userReducer
	},
})

store.subscribe(() => {
	console.log("State:", store.getState());
});

export default store;
