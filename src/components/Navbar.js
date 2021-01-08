import React from 'react';
import { Link } from 'react-router-dom';

// Components
import { ProfileIcon } from './';

// Material UI stuff
import { AppBar, Toolbar, Button  } from '@material-ui/core';

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
					{isAuthenticated || <Button color="inherit" to='/login' component={Link}>Login</Button>}
					{isAuthenticated || <Button color="inherit" to='/signup' component={Link}>Signup</Button>}
					{isAuthenticated && <ProfileIcon isAuthenticated={isAuthenticated} />}
				</div>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;