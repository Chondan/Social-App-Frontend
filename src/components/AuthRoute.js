import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Slices
import { resetUserData, fetchUserData } from '../redux/slices/userSlice';

// Authorization
const isAuthorised = () => {
	const token = localStorage.getItem('token');
	if (!token) return false;

	const { exp } = jwt_decode(token); // exp is in milli-second unit
	if (exp && exp * 1000 > Date.now()) {
		return true;
	}
	
	return false;
}

const AuthRoute = ({
	component: Component, path, ...rest
}) => {

	// Redux
	const dispatch = useDispatch();
	const state = useSelector(state => state);
	const isLoadedUserData = useSelector(state => state.user.loaded);
	const isAuthenticated = useSelector(state => state.user.authenticated);
	console.log(state);

	useEffect(() => {
		isAuthorised() ? dispatch(fetchUserData()) : dispatch(resetUserData());

		console.log("isAuthenticated: ", isAuthenticated);
		console.log("isLoadedUserData: ", isLoadedUserData);

		if (!isAuthenticated) return;
		if (isAuthenticated && !isLoadedUserData) return dispatch(fetchUserData());
	}, [isLoadedUserData, dispatch, isAuthenticated]);

	if (['/login', '/signup'].includes(path)) return <Route render={(match) => isAuthenticated ? <Redirect to='/' /> : <Component {...match} />} />;
	return <Route path={path} {...rest} component={Component} />;
}

export default AuthRoute;