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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

// Components
import MyButton from './MyButton';
import DeleteScreamButton from './DeleteScreamButton';
import CommentDialog from './CommentDialog';

// Slices
import { fetchLikeScream, fetchUnlikeScream } from '../redux/slices/screamSlice';

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
						<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
					</div>
				</div>
				<Typography variant="body1">{body}</Typography>
				<div><Link to={`/scream/${screamId}`}>See Post</Link></div>
				{likeButton}<span>{likeCount} Likes</span>
				<CommentDialog scream={scream} maxHeight={400} />
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
