import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { ProfileIcon } from './';
// Material UI stuff
import { AppBar, Toolbar, Button  } from '@material-ui/core';
// Material UI
// import AddIcon from '@material-ui/icons/Add';
// import HomeIcon from '@material-ui/icons/Home';
// import Notifications from '@material-ui/icons/Notifications';
// Redux
import { useSelector } from 'react-redux';

const Navbar = () => {

	const isAuthenticated = useSelector(state => state.user.authenticated);

	return (
		<AppBar>
			<Toolbar className="nav-container">
				<div>
					<Button color="inherit" to='/' component={Link} >Home</Button>
				</div>
				<div>
					{isAuthenticated || <Button color="inherit" to='/login' component={Link}><span id="login-btn">Login</span></Button>}
					{isAuthenticated || <Button color="inherit" to='/signup' component={Link}>Signup</Button>}
					{isAuthenticated && <ProfileIcon isAuthenticated={isAuthenticated} />}
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;