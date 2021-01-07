import React from 'react';
import PropTypes from 'prop-types';
import AppIcon from '../assets/images/favicon.png';
import { Link } from 'react-router-dom';

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

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slices
import { selectLoading, selectErrors } from '../redux/slices/uiSlice';
import { fetchAction } from '../redux/slices/userSlice';

let Signup = ({
	classes
}) => {
	const { input: email, onInputChange: onEmailChange } = useInput('');
	const { input: password, onInputChange: onPasswordChange } = useInput('');
	const { input: confirmPassword, onInputChange: onConfirmPasswordChange } = useInput('');
	const { input: userHandle, onInputChange: onUserHandleChange } = useInput('');

	// Redux
	const loading = useSelector(selectLoading);
	const errors = useSelector(selectErrors);
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchAction('signup')({ email, password, confirmPassword, handle: userHandle }));
	}

	return (
		<Grid container className={classes.form}>
			<Grid item sm></Grid>
			<Grid item sm>
				<img alt="App's icon" className={classes.image} src={AppIcon} />
				<Typography variant="h2" className={classes.pageTitle}>Signup</Typography>
				<form noValidate onSubmit={handleSubmit}>
					<TextField id="emai" name="email" type="email" label="Email" 
						className={classes.textField} value={email} onChange={onEmailChange}
						helperText={errors.email} error={errors.email ? true : false} fullWidth
					/>
					<TextField id="password" name="password" type="password" label="Password" 
						className={classes.textField} value={password} onChange={onPasswordChange}
						helperText={errors.password} error={errors.password ? true : false} fullWidth
					/>
					<TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
						className={classes.textField} value={confirmPassword} onChange={onConfirmPasswordChange}
						helperText={errors.password} error={errors.password ? true : false} fullWidth
					/>
					<TextField id="handle" name="handle" type="text" label="Handle" 
						className={classes.textField} value={userHandle} onChange={onUserHandleChange}
						helperText={errors.handle} error={errors.handle ? true : false} fullWidth
					/>
					{errors.message && 
						<Typography variant="body2" className={`${classes.customError}`}>
							{errors.message}
						</Typography>
					}
					<Button type="submit" variant="contained" color="primary" 
						className={classes.button} disabled={loading}>
						Signup
					</Button>
					<small className={classes.block}>Already have an account? Login <Link to='/login'>here</Link></small>
					{loading && <CircularProgress size={30} className={classes.block} />}
				</form>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
}
Signup.propTypes = {
	classes: PropTypes.object.isRequired,
};
Signup = withStyles(styles)(Signup);

export default Signup;