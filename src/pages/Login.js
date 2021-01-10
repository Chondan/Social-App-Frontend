import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';

// Components
import { AnimationMessage } from '../components';

// Hooks
import useInput from '../hooks/useInput';

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles'; // To get styles from theme
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Utils
import { styles } from '../utils/theme';
import { withClearErrors } from '../utils/error';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slices
import { selectLoading, selectErrors } from '../redux/slices/uiSlice';
import { fetchAction } from '../redux/slices/userSlice';


let Login = ({
	classes
}) => {
	const history = useHistory();

	// Custom Hooks
	const { input: email, onInputChange: onEmailChange } = useInput('');
	const { input: password, onInputChange: onPasswordChange } = useInput('');

	// Redux
	const loading = useSelector(selectLoading);
	const errors = useSelector(selectErrors);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchAction('login')({ data: { email, password }, history }));
	}

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>
			<Grid item sm>
				<AnimationMessage message="Welcome Back!!" />
				<form noValidate onSubmit={handleSubmit}>
					<TextField id="emai" name="email" type="email" label="Email" 
						className={classes.textField} value={email} onChange={onEmailChange}
						helperText={errors.email} error={errors.email ? true : false} fullWidth
					/>
					<TextField id="password" name="password" type="password" label="Password" 
						className={classes.textField} value={password} onChange={onPasswordChange}
						helperText={errors.password} error={errors.password ? true : false} fullWidth
					/>
					{errors.message && 
						<Typography variant="body2" className={`${classes.customError}`}>
							{errors.message}
						</Typography>
					}
					<Button type="submit" variant="contained" color="primary" 
						className={classes.button} disabled={loading}>
						Login
					</Button>
					<small className={classes.block}>Don't have an account? Sign up <Link to='/signup'>here</Link></small>
					{loading && <CircularProgress size={30} className={classes.block} />}
				</form>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
}
Login.propTypes = {
	classes: PropTypes.object.isRequired,
};
Login = withStyles(styles)(Login);
Login = withClearErrors(Login); // Enhanced component

export default Login;