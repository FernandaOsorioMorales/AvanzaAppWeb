import { React } from "react";
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

const ProtectedRoute = () => {
	const loggedIn = useSelector(state => state.user.loggedIn);

	if (loggedIn) {
		return (null);
	}
	return (<Navigate to="/login" />);
}

export default ProtectedRoute;
