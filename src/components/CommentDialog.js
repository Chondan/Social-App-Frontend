import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

// Components
import MyButton from './MyButton';
import CommentLoadingSkeleton from './loadingSkeletons/CommentLoadingSkeleton';

// Material UI
import ChatIcon from '@material-ui/icons/Chat';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import TelegramIcon from '@material-ui/icons/Telegram';
import CircularProgress from '@material-ui/core/CircularProgress';

// Hooks
import useInput from '../hooks/useInput';

// Redux
import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

// Utils
import { commentStyles as styles } from '../utils/theme';
import { getAuthorizationHeader } from '../utils/auth';

// Slices
import { updateComment } from '../redux/slices/screamSlice';

dayjs.extend(relativeTime);

let Comment = ({
	comment, classes
}) => {
	const { userHandle, body, createdAt, userImage } = comment;
	return (
		<li className={classes.comment}>
			<Card className={classes.card}>
				<CardContent className={classes.content}>
					<div className="scream-username">
					<Link to={`/users/${userHandle}`} ><img className={classNames("scream-profile-icon", classes.commentProfileIcon)} src={userImage} alt="user profile" /></Link>
						<div>
							<Typography variant="body2" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
							<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
						</div>
					</div>
					<Typography variant="body1" color="textSecondary">{body}</Typography>
				</CardContent>
			</Card>
		</li>
	);
}
Comment = withStyles(styles)(Comment);

let CommentDialog = ({
	scream, classes, maxHeight
}) => {
	const [loading, setLoading] = useState(false);
	const [addCommentLoading, setAddCommentLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [comments, setComments] = useState([]);

	const { commentCount, screamId } = scream;
	const { input, onInputChange, setInput } = useInput('');
	const inputRef = useRef();
	const [open, setOpen] = useState(false);

	const isAuthenticated = useSelector(state => state.user.authenticated);
	const commentUserImageUrl = useSelector(state => state.user.credentials.imageUrl);
	const commentUserHandle = useSelector(state => state.user.credentials.handle);
	const dispatch = useDispatch();

	const toggle = () => setOpen(open => !open);
	const loadComment = () => {
		toggle();

		// Loading comments
		if (loaded) return;
		setLoading(true);
		axios({ method: 'get', url: `/scream/${screamId}` })
		.then(res => res.data)
		.then(data => {
			const { comments } = data;
			comments.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
			setComments(comments);
			setLoaded(true);
			setLoading(false);
		})
		.catch(err => console.error(err));
	}

	const addComment = () => {

		// Add comment
		if (!input) return inputRef.current.focus();
		setAddCommentLoading(true);
		axios({ method: 'post', url: `/scream/${screamId}/comment`, headers: { ...getAuthorizationHeader() }, data: { body: input } })
		.then(res => res.data)
		.then(data => {
			setComments([...comments, data]);
			dispatch(updateComment(screamId));
			setAddCommentLoading(false);
			setInput('');
		})
		.catch(err => {
			console.error(err);
			setAddCommentLoading(false);
			setInput('');
		})
	}

	return (
		<Fragment>
			<MyButton tip="comments" onClick={loadComment}>
				<ChatIcon color="primary" />
			</MyButton>
			<span>{commentCount} Comments</span>
			<div className={classNames(classes.commentListWrapper, open ? classes.show : '')}>
				<ul className={classes.commentList} style={{ maxHeight: maxHeight }}>
					{loading ? <CommentLoadingSkeleton piece={2} /> : 
						comments.length === 0 ? <div>No comments</div> :
						comments.map(comment => (
							<Comment key={nanoid()} comment={comment} />
						))
					}
				</ul>
			</div>
			{isAuthenticated && <div className={classes.commentBoxWrapper}>
	        	<div className={classes.commentBox}>
	            	<Link to={`/users/${commentUserHandle}`} ><img className={classNames("scream-profile-icon", classes.commentProfileIcon, classes.commentUserProfile)} src={commentUserImageUrl} alt="user profile" /></Link>
	            	<TextField id="input-with-icon-grid" label="Leave your comment..." multiline className={classes.commentInput}
	            		onChange={onInputChange} value={input} inputRef={inputRef}
	            	/>
		        	<MyButton tip="comment" placement="top" disabled={addCommentLoading} onClick={addComment} >
		        		<TelegramIcon color="secondary" />
			        	{addCommentLoading && <CircularProgress size={30} className={classes.block} />}
		        	</MyButton>
	        	</div>
		    </div>}
		</Fragment>
	);
}
CommentDialog = withStyles(styles)(CommentDialog);

export default CommentDialog;