import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

// Components
import MyButton from './MyButton';

// Material UI 
import withStyles from '@material-ui/core/styles/withStyles';
// Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Redux
import { useDispatch } from 'react-redux';

// Slices
import { fetchDeleteScream } from '../redux/slices/screamSlice';

// Hooks
import useDialog from '../hooks/useDialog';

const styles = {
	deleteButton: {
		position: 'absolute',
		right: '2%',
		top: '7%'
	}
};

let DeleteScreamButton = ({
	screamId, classes
}) => {

	const location = useLocation();
	const dispatch = useDispatch();

	const { open: status, openDialog, closeDialog  } = useDialog(false);
	const handleDeleteScream = (id) => {
		const needToReload = location.pathname === `/scream/${screamId}` ? true : false;
		dispatch(fetchDeleteScream({ screamId: id, needToReload }));
		closeDialog();
	}

	return (
		<Fragment>
			<MyButton tip="Delete Scream" onClick={openDialog} btnClassName={classes.deleteButton}>
				<DeleteOutline color="secondary" />
			</MyButton>
			<Dialog open={status} onClose={closeDialog} fullWidth maxWidth="sm">
				<DialogTitle>
					Are you sure you want to delete this scream?
				</DialogTitle>
				<DialogActions>
					<Button onClick={closeDialog} color="primary">Cancel</Button>
					<Button onClick={() => handleDeleteScream(screamId)} color="secondary">Delete</Button>
				</DialogActions>
			</Dialog>
		</Fragment>
	);
}
DeleteScreamButton = withStyles(styles)(DeleteScreamButton);

export default DeleteScreamButton;