import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Components
import MyButton from './MyButton';
import DeleteScreamButton from './DeleteScreamButton';

// Slices
import { fetchLikeScream, fetchUnlikeScream } from '../redux/slices/screamSlice';

// Redux 
import { useDispatch, useSelector } from 'react-redux';

dayjs.extend(relativeTime);

// the 'classes' object
const styles = {
	card: {
		marginBottom: 20,
		position: "relative",
	},
	image: {
		width: "30%",
		maxWidth: 150,
		backgroundSize: "cover",
	},
	content: {
		width: "80%",
		padding: 25
	}
};

let ScreamList = ({
	classes, scream
}) => {
	const { body, createdAt, userHandle, userImage, screamId, likeCount, commentCount } = scream;
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
					<img className="scream-profile-icon" src={userImage} alt="user profile" />
					<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
				</div>
				<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
				<Typography variant="body1">{body}</Typography>
				{likeButton}<span>{likeCount} Likes</span>
				<MyButton tip="comments">
					<ChatIcon color="primary" />
				</MyButton>
				<span>{commentCount} Comments</span>
				{deleteButton}
			</CardContent>
		</Card>
	);
}
ScreamList = withStyles(styles)(ScreamList);

const Scream = ({
	screams
}) => {

	const isScreamLoading = useSelector(state => state.screams.loading);

	const recentScreamsMarkup = !isScreamLoading ? (
		screams.map(scream => <ScreamList key={scream.screamId} scream={scream} />)
	) : <div>Loading...</div>;

	return (
		<div>{recentScreamsMarkup}</div>
	);
}

export default Scream;
