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

export { getFormatErrors, initialErrors };