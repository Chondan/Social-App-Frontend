const getApiEndpoint = path => {
	return `${process.env.REACT_APP_API_BASE_URL}${path}`;
}

export { getApiEndpoint };