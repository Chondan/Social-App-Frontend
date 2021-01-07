import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

const mockupToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUwOGI0NzM0YjYxNmE0MWFhZmE5MmNlZTVjYzg3Yjc2MmRmNjRmYTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsLW1lZGlhLWFwcC1hM2U0ZiIsImF1ZCI6InNvY2lhbC1tZWRpYS1hcHAtYTNlNGYiLCJhdXRoX3RpbWUiOjE2MDk5OTk1MjUsInVzZXJfaWQiOiJ4aUg4ZzluNHFoVmZwUnZ2TkRRRHJUR2s0SncyIiwic3ViIjoieGlIOGc5bjRxaFZmcFJ2dk5EUURyVEdrNEp3MiIsImlhdCI6MTYwOTk5OTUyNSwiZXhwIjoxNjEwMDAzMTI1LCJlbWFpbCI6ImNob25kYW5AdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiY2hvbmRhbkBleGFtcGxlLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.DrAaGl-bOKMJcJPrRXQsFSK6IP-CfCaMC1NvgYQNc02SYe7CGQIpnGKQUgCmra1n85QBvAmefLUMGAbFuuC5_x9AQ_3yongPdkwlX_2fF-T5NKJbNqIo_4TeUIHPjybREwUJJ_Rc9nPNuxD0c84G9z7lRGzbutrA2Ey6HjEqPuJJ8CQqpD2pYnNbIRf46C-aIZnFLCJwGh6r5o9EYQjCW64-sHCy_K77Y0zyg-wqoJPEnbWasN59SmFGZdyNNfVPFCngiO8r6nX-_iOQBiimflQ18dLT4HHN6xF_eVcJWaM6vftk9y1fBgchsnhZBUvsMUMzggk3XpPrBnHP5UJl4Q";

// Authorization
const isAuthorised = () => {
	const token = localStorage.getItem('token');
	// const token = mockupToken;

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

	if (['/login', '/signup'].includes(path)) return <Route render={(match) => isAuthorised() ? <Redirect to='/' /> : <Component {...match} />} />;
	return <Route render={(match) => isAuthorised() ? <Component {...match} /> : <Redirect to='/login' />}  />
}

export default AuthRoute;