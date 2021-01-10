import jwt_decode from 'jwt-decode';

const getAuthorizationHeader = () => {
	return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

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

export { getAuthorizationHeader, isAuthorised };