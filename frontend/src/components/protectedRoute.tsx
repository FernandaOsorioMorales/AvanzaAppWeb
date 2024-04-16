import { React } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {continue_login} from "../utils/login";

const ProtectedRoute = () => {
	const loggedIn = useSelector(state => state.user.loggedIn);

	if (loggedIn) {
		return (null);
	}
	continue_login().then(res => {
		if (res) {
			return null;
		} else {
		return (<Navigate to="/login" />);
		}
	})
}

export default ProtectedRoute;
