import React, { useEffect } from 'react';

// Redux 
import { useDispatch } from 'react-redux';

// Slices
import { setErrors } from '../redux/slices/uiSlice';

const initialErrors = {
	email: null,
	password: null,
	error: null,
	message: null,
	handle: null,
}

const getFormatErrors = (errObj) => {
	const formattedErrors = { ...initialErrors, ...errObj.response.data, ...errObj.response.data.errors };
	delete formattedErrors.errors;
	return formattedErrors;
}

// Higher Order Components
const withClearErrors = (WrappedComponent, payload) => {
	return (props) => {

		const dispatch = useDispatch();
		useEffect(() => {
			return () => dispatch(setErrors(initialErrors));
		}, [dispatch])

		return <WrappedComponent {...props} />
	}
}

export { getFormatErrors, initialErrors, withClearErrors };