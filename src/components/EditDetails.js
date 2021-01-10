import React, { Fragment, useEffect, useCallback } from 'react';
//Material UI
import withStyles from '@material-ui/core/styles/withStyles';
// Utils 
import { styles as globalStyles } from '../utils/theme';
// Slices
import { fetchEditUserDetails } from '../redux/slices/userSlice';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Hooks
import useInput from '../hooks/useInput';
import useDialog from '../hooks/useDialog';
// Material UI
import EditIcon from '@material-ui/icons/Edit';
// Dialog
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// Components
import { MyButton } from './';

const styles = {
	...globalStyles,
	button: {
		'&:hover': {
			transform: 'scale(1.2)',
			transition: 'transform 0.2s ease-out',
		}
	}
}

let EditDetails = ({
	classes
}) => {

	const dispatch = useDispatch();

	// CUSTOM HOOKS
	const { input: bio, onInputChange: onBioChange, setInput: setBio } = useInput();
	const { input: website, onInputChange: onWebsiteChange, setInput: setWebsite } = useInput();
	const { input: location, onInputChange: onLocationChange, setInput: setLocation } = useInput();
	const { open: status, openDialog, closeDialog } = useDialog(false);

	const credentials = useSelector(state => state.user.credentials);

	const mapGlobalStateToLocal = useCallback(() => {
		const { bio, website, location } = credentials;
		setBio(bio);
		setWebsite(website);
		setLocation(location);
	}, [credentials, setBio, setWebsite, setLocation]);

	useEffect(() => {
		// Move Global state to local state
		mapGlobalStateToLocal();
	}, [mapGlobalStateToLocal]);

	const isSomethingChanged = () => {
		const { bio: bioBefore, website: websiteBefore, location: locationBefore } = credentials;
		if (bio === bioBefore && website === websiteBefore && location === locationBefore) return false;
		return true;
	}
	const handleSubmit = () => {
		closeDialog()

		if (!isSomethingChanged()) return console.log("No Changes");
		// Fetching to edit user's details
		dispatch(fetchEditUserDetails({ bio, website, location }));
	}

	return (
		<Fragment>
			<MyButton tip="Edit details" tooltipPlacement="top" btnClassName={classes.button} onClick={openDialog} >
				<EditIcon color="primary" />
			</MyButton>
			<Dialog open={status} onClose={closeDialog} fullWidth maxWidth="sm">
				<DialogTitle>Edit your details</DialogTitle>
				<DialogContent>
					<form>
						<TextField name="bio" type="text" label="bio" multiline 
							rows="3" placeholder="A short bio about yourself"
							className={classes.textField} value={bio} 
							onChange={onBioChange} fullWidth
						 />
						 <TextField name="website" type="text" label="website" multiline 
							rows="3" placeholder="Your personal/professional website"
							className={classes.textField} value={website} 
							onChange={onWebsiteChange} fullWidth
						 />
						 <TextField name="location" type="text" label="Location" multiline 
							rows="3" placeholder="Where do you live?"
							className={classes.textField} value={location} 
							onChange={onLocationChange} fullWidth
						 />
					</form>
				</DialogContent>
				<DialogActions>
					<Button color="primary" onClick={closeDialog}>
						Cancel
					</Button>
					<Button color="primary" onClick={handleSubmit}>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
EditDetails = withStyles(styles)(EditDetails);

export default EditDetails;