import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./state/userSlice"

export default configureStore({
	reducer: {
		user: userReducer
	},
})
