import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Slices
import { resetUserData, fetchUserData } from '../redux/slices/userSlice';

// Utils
import { isAuthorised } from '../utils/auth';


const AuthRoute = ({
	component: Component, path, ...rest
}) => {

	// Redux
	const dispatch = useDispatch();
	const state = useSelector(state => state);
	const { loaded: isLoadedUserData, authenticated: isAuthenticated } = useSelector(state => state.user);
	console.log(state);

	useEffect(() => {
		isAuthorised() ? dispatch(fetchUserData()) : dispatch(resetUserData());

		console.log("isAuthenticated: ", isAuthenticated);
		console.log("isLoadedUserData: ", isLoadedUserData);

		if (isAuthenticated && !isLoadedUserData) return dispatch(fetchUserData());
	}, [isLoadedUserData, dispatch, isAuthenticated]);

	if (['/login', '/signup'].includes(path)) {
		return <Route render={(match) => isAuthenticated ? <Redirect to='/' /> : <Component {...match} />} />;
	}
	return <Route path={path} {...rest} component={Component} />;
}

export default AuthRoute;