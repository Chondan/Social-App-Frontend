import React, { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';

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
import { Scream, EditDetails, MyButton, PostScream } from '../components';

// Utils
import { profileStyles as styles } from '../utils/theme';
import { withClearErrors } from '../utils/error';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slices
import { selectUserData, fetchUploadImage } from '../redux/slices/userSlice';
import { selectScreamsByUserHandle, fetchScreams } from '../redux/slices/screamSlice';

let ProfileMarkup = ({
	classes, isOwnProfile, userData
}) => {

	const dispatch = useDispatch();

	if (!userData) return <div>Loading...</div>;

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
				<div className="button-wrapper">
					{isOwnProfile && <EditDetails />}
					{isOwnProfile && <PostScream />}
				</div>
			</div>
		</Paper>
	);
};
ProfileMarkup = withStyles(styles)(ProfileMarkup);

let Profile = ({
	match
}) => {
	const dispatch = useDispatch();

	const { handle: matchHandle } = match.params;
	const userData= useSelector(selectUserData);
	const { credentials: { handle } } = userData;
	const isOwnProfile = (handle === match.params.handle);

	// Get Screams
	const displayScream = useSelector(selectScreamsByUserHandle(matchHandle));

	// ----- FETCHING OTHER USER DETAILS -----
	const [otherUserDetails, setOtherUserDetails] = useState(null);
	useEffect(() => {
		dispatch(fetchScreams());
		if (isOwnProfile) return;

		axios({ method: 'get', url: `/user/${matchHandle}` })
		.then(res => {
			const otherUserDetails = res.data;
			const displayUserData = {
				...otherUserDetails,
				credentials: {
					bio: otherUserDetails.bio,
					imageUrl: otherUserDetails.imageUrl,
					website: otherUserDetails.website,
					location: otherUserDetails.location,
					handle: otherUserDetails.handle,
				},
				createdAt: otherUserDetails.createdAt,
			}
			setOtherUserDetails(displayUserData);
		})
		// User Not Found 
		.catch(err => console.log(err.response.data));

	}, [isOwnProfile, dispatch, matchHandle]);


	return (
		<Grid container spacing={1} >
			<Fragment>
				<Grid item sm={4} xs={12}>
					<ProfileMarkup isOwnProfile={isOwnProfile} userData={isOwnProfile ? userData : otherUserDetails} />
				</Grid>
				<Grid item sm={8} xs={12}>
					<Scream screams={displayScream} />
				</Grid>
			</Fragment>
		</Grid>
	);
}
Profile = withClearErrors(Profile);

export default withStyles(styles)(Profile);