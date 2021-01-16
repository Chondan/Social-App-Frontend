import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import MyButton from './MyButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const LikeButton = ({
	likedScream, handleLike, handleUnlike, authenticated
}) => {
	return (
		<Fragment>
			{
				!authenticated ? (
					<MyButton tip="like">
						<Link to='/login'>
							<FavoriteBorder color="primary" />
						</Link>
					</MyButton>
				) : (
					likedScream ? (
						<MyButton tip="Unlike" onClick={handleUnlike}>
							<FavoriteIcon color="primary" />
						</MyButton>
					) : (
						<MyButton tip="like" onClick={handleLike}>
							<FavoriteBorder color="primary" />
						</MyButton>
					)
				)
			}
		</Fragment>
	);
}

export default LikeButton;