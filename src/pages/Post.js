import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Components
import { CommentDialog, DeleteScreamButton, MyButton } from '../components';

// Slices
import { fetchLikeScream, fetchUnlikeScream, selectScreamById } from '../redux/slices/screamSlice';

// Redux 
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { screamStyles as styles } from '../utils/theme';

dayjs.extend(relativeTime);

let ScreamList = ({
	classes, scream
}) => {
	const { body, createdAt, userHandle, userImage, screamId, likeCount } = scream;
	const dispatch = useDispatch();

	const handleLikeScream = (id) => dispatch(fetchLikeScream(id));
	const handleUnlikeScream = (id) => dispatch(fetchUnlikeScream(id));

	// Check if the scream is already liked
	const userData = useSelector(state => state.user);
	const { likes, authenticated, credentials: { handle } } = userData;
	const likedScream = likes && likes.some(like => like.screamId === screamId);

	const likeButton = !authenticated ? (
		<MyButton tip="like">
			<Link to='/login'>
				<FavoriteBorder color="primary" />
			</Link>
		</MyButton>
	) : (
		likedScream ? (
			<MyButton tip="Unlike" onClick={() => handleUnlikeScream(screamId)}>
				<FavoriteIcon color="primary" />
			</MyButton>
		) : (
			<MyButton tip="like" onClick={() => handleLikeScream(screamId)}>
				<FavoriteBorder color="primary" />
			</MyButton>
		)
	);
	const deleteButton = authenticated && (userHandle === handle) ? (
		<DeleteScreamButton screamId={screamId} />
	) : null;

	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<div className="scream-username">
					<Link to={`/users/${userHandle}`} ><img className="scream-profile-icon" src={userImage} alt="user profile" /></Link>
					<div>
						<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
						<Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('DD MMMM YYYY HH:mm:ss')}</Typography>
					</div>
				</div>
				<Typography variant="body1">{body}</Typography>
				{likeButton}<span>{likeCount} Likes</span>
				<CommentDialog scream={scream} maxHeight='60vh' />
				{deleteButton}
			</CardContent>
		</Card>
	);
}
ScreamList = withStyles(styles)(ScreamList);

const Post = ({
	match
}) => {
	const { screamId } = match.params;
	const [scream, setScream] = useState();
	const [loading, setLoading] = useState(true);
	const isScreamLoaded = useSelector(state => state.screams.loaded);

	const loadedScream = useSelector(state => selectScreamById(state, screamId));

	useEffect(() => {
		if (isScreamLoaded) return console.log("Scream is already loaded");
		setLoading(true);
		axios({ method: 'get', url: `/scream/${screamId}` })
		.then(res => res.data)
		.then(data => {
			setScream(data);
			setLoading(false);
		})
		.catch(err => {
			setScream(null);
			setLoading(false);
		})
	}, [isScreamLoaded, screamId]);
 
	return (
		<Fragment>
			{ 	
				isScreamLoaded ? <ScreamList scream={loadedScream} /> :
				loading ? <div>Loading...</div> : 
				scream === null ? <div>Scream not found</div> : 
				<ScreamList scream={scream} />
			}
		</Fragment>
	);
}

export default Post;
