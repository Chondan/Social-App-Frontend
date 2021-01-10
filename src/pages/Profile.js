import React, { Fragment } from 'react';
import dayjs from 'dayjs';

// Material UI
import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';

// Components
import { Scream, EditDetails, MyButton } from '../components';

// Utils
import { mockupScreams } from '../utils/mockupData';
import { profileStyles as styles } from '../utils/theme';
import { withClearErrors } from '../utils/error';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slices
import { selectUserData, fetchUploadImage } from '../redux/slices/userSlice';

let ProfileMarkup = ({
	classes, isOwnProfile, userData
}) => {

	const dispatch = useDispatch();

	// const { credentials: { bio, imageUrl, website, location, handle }, createdAt } = useSelector(selectUserData);
	const { credentials: { bio, imageUrl, website, location, handle }, createdAt } = userData;


	const handleImageChange = (e) => {
		const image = e.target.files[0];
		// send to server
		console.log(image);

		const formData = new FormData();
		formData.append('profile-image', image, image.name);
		dispatch(fetchUploadImage(formData));
	}

	const handleEditPicture = () => {
		const fileInput = document.getElementById('imageInput');
		fileInput.click();
	}

	return (
		<Paper className={classes.paper}>
			<div className={classes.profile}>
				<div className="image-wrapper">
					<img className="profile-image" alt="profile" src={imageUrl}/>
					{isOwnProfile && 
						<Fragment>
							<input type="file" id="imageInput" hidden="hidden" onChange={handleImageChange} />
							<MyButton tip="Edit profile picture" tooltipPlacement="top" btnClassName="btn" onClick={handleEditPicture} >
								<EditIcon color="primary" />
							</MyButton>
						</Fragment>
					}
				</div>
				<hr/>
				<div className="profile-details">
					{bio && <Typography variant="body2">@{handle}</Typography>}
					<hr/>
					{bio && <Typography variant="body2">{bio}</Typography>}
					<hr/>
					{location && (
						<Fragment>
							<LocationOn color="primary" /><span>{location}</span>
							<hr/>
						</Fragment>
					)}
					{website && (
						<Fragment>
							<LinkIcon color="primary" />
							<a target="_blank" rel="noopener noreferrer" href={website}>
								{' '}{website}
							</a>
							<hr/>
						</Fragment>
					)}
					<CalendarToday color="primary" />{' '}<span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
				</div>
				{isOwnProfile && <EditDetails />}
			</div>
		</Paper>
	);
};
ProfileMarkup = withStyles(styles)(ProfileMarkup);

const mockupOtherUserData = {
	credentials: {
		bio: "Mockup bio",
		website: "Mockup website",
		location: "Mockup location",
		imageUrl: `https://raw.githubusercontent.com/Chondan/Social-App/main/Assets/default-profile.png`,
		handle: "chondan_example",
	},
	createdAt: "2021-01-05T09:59:08.884Z",
}

let Profile = ({
	match
}) => {

	const userData = useSelector(selectUserData);
	const { credentials: { handle } } = userData;
	const isOwnProfile = (handle === match.params.handle);

	// ----- FETCHING OTHER USER DETAILS -----

	return (
		<Grid container spacing={1} >
			<Fragment>
				<Grid item sm={true ? 4 : 12} xs={12}>
					<ProfileMarkup isOwnProfile={isOwnProfile} userData={isOwnProfile ? userData : mockupOtherUserData} />
				</Grid>
				<Grid item sm={8} xs={12}>
					<Scream screams={mockupScreams} />
				</Grid>
			</Fragment>
		</Grid>
	);
}
Profile = withClearErrors(Profile);

export default withStyles(styles)(Profile);