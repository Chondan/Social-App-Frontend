import React, { Fragment } from 'react';
import classNames from 'classnames';

// Material UI
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
	paper: { 
		padding: 10,
		height: '100%',
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			maxWidth: '100%',
			borderRadius: '50%',
			margin: 'auto'
		},
		'& .profile-details': {
			textAlign: 'center',
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		filter: 'blur(0.1px)'
	},
	blur: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		color: 'transparent',
		display: 'inline-block'
	},
}

let ProfileLoadingSkeleton = ({
	classes, isOwnProfile
}) => {

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<div className={classNames("profile-image", classes.blur)}>IMAGE</div>
				</div>
				<hr/>
				<div className="profile-details">
					<div className={classes.blur}>HANDLE: USERNAME</div>
					<hr/>
					<div className={classes.blur}>BIO: FIRSTNAME LASTNAME</div>
					<hr/>
					<Fragment>
						<div className={classes.blur}>LOCATION: THAILAND, BANGKOK</div>
						<hr/>
					</Fragment>
					<Fragment>
						<div className={classes.blur}>WEBSITE: WWW.ME.COM</div>
						<hr/>
					</Fragment>
					<div className={classes.blur}>JOIN AT XX XX XX</div>
				</div>
			</div>
		</Paper>
	);
};
ProfileLoadingSkeleton = withStyles(styles)(ProfileLoadingSkeleton);

export default ProfileLoadingSkeleton;