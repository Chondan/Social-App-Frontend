import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Home, Login, SignUp, Profile, Post } from './pages';
import { Navbar, AuthRoute } from './components';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme as themeObj } from './utils/theme';
import axios from 'axios';

const theme = createMuiTheme(themeObj);

axios.defaults.baseURL = "https://us-central1-social-media-app-a3e4f.cloudfunctions.net/api";

const App = () => {
	return (
		<ThemeProvider theme={theme}>
		<div className="App">
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<AuthRoute exact path='/' component={Home} />
						<AuthRoute exact path='/login' component={Login} />
						<AuthRoute exact path='/signup' component={SignUp} />
						<AuthRoute exact path='/users/:handle' component={Profile} />
						<AuthRoute exact path='/scream/:screamId' component={Post} />
					</Switch>
				</div>
			</Router>
		</div>
		</ThemeProvider>
	);
}

export default App;