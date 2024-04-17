import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {continue_login} from "../utils/login";

const ProtectedRoute = () => {
	const loggedIn = useSelector(state => state.user.loggedIn);

	const [resolved, SetResolved] = useState(false);

	useEffect(() => {
		if (loggedIn) {
			SetResolved(true);
		} else {
			continue_login().then(_ => {
				SetResolved(true);
			})
		}
	}, []);

	if (resolved && !loggedIn)
		return (<Navigate to="/login" />);
	return null;
}

export default ProtectedRoute;
