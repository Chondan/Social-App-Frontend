import React, { Fragment, useEffect } from 'react';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
// Utils 
import { styles as globalStyles } from '../utils/theme';
import { initialErrors } from '../utils/error';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useInput from '../hooks/useInput';
import useDialog from '../hooks/useDialog';
// Material UI
import CircularProgress from '@material-ui/core/CircularProgress';
// Icons
import PostIcon from '@material-ui/icons/AddBox';
// Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Components
import { MyButton } from './';
// Slices
import { fetchPostScream } from '../redux/slices/screamSlice';
import { setErrors } from '../redux/slices/uiSlice';

const styles = {
	...globalStyles,
	button: {
		'&:hover': {
			transform: 'scale(1.2)',
			transition: 'transform 0.2s ease-out',
		}
	},
	postLoading: {
		position: 'absolute',
		bottom: '3%',
		left: '3%'
	}
}

let PostScream = ({
	classes
}) => {

	const dispatch = useDispatch();
	const uiLoading = useSelector(state => state.ui.loading);
	const uiErrors = useSelector(state => state.ui.errors);

	// CUSTOM HOOKS
	const { input: scream, onInputChange: onScreamChange, setInput: setScream } = useInput('');
	const { open: status, openDialog, closeDialog } = useDialog(false);

	const handleClose = () => {
		closeDialog();
		dispatch(setErrors(initialErrors)); // Clear the errors
	}
	const handleSubmit = () => {
		console.log(scream);
		dispatch(fetchPostScream(scream));
		if (scream) return closeDialog();
		// setScream('');
	}

	useEffect(() => {
		if (uiLoading) return;
		setScream('');
	}, [uiLoading, setScream])

	return (
		<Fragment>
			<MyButton tip="Post a Scream" tooltipPlacement="top" btnClassName={classes.button} onClick={openDialog} >
				<PostIcon color="primary" />
			</MyButton>
			<Dialog open={uiLoading || status} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>What are you thinking about?</DialogTitle>
				<DialogContent>
					<form>
						<TextField name="scream" type="text" label="Scream" multiline 
							rows="10" placeholder="..."
							className={classes.textField} value={scream} 
							onChange={onScreamChange} fullWidth error={uiErrors.message ? true : false}
							helperText={uiErrors.message}
						 />
					</form>
				</DialogContent>
				<DialogActions>
					{uiLoading && <CircularProgress size={30} className={classes.postLoading} />}
					<Button color="primary" onClick={handleClose}>
						Cancel
					</Button>
					<Button color="primary" onClick={handleSubmit} disabled={uiLoading}>
						Post
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
PostScream = withStyles(styles)(PostScream);

export default PostScream;