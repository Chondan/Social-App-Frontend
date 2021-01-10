import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Home, Login, SignUp, Profile } from './pages';
import { Navbar, AuthRoute } from './components';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme as themeObj } from './utils/theme';

const theme = createMuiTheme(themeObj);

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
					</Switch>
				</div>
			</Router>
		</div>
		</ThemeProvider>
	);
}

export default App;