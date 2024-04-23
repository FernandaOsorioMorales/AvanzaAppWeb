import React from "react";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {continue_login} from "../utils/login";

const ProtectedRoute = ({kindsAllowed = ["athlete", "trainer"]}) => {
	const loggedIn = useSelector(state => state.user.loggedIn);
	const kind = useSelector(state => state.user.kind);

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

	if (resolved) {
		if (!loggedIn)
			return (<Navigate to="/login" />);
		if (!kindsAllowed.includes(kind))
			return (<Navigate to="/login" />);
	}
	return null;
}

export default ProtectedRoute;
