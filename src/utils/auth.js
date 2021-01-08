const getAuthorizationHeader = () => {
	return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

export { getAuthorizationHeader };