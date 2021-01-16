import React from 'react';
import classNames from 'classnames';

// Material UI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
	blur: {
		backgroundColor: 'rgba(0, 0, 0, 0.2)',
		margin: 4,
		color: 'transparent',
		fontSize: 'xx-small'
	},
	profileImage: {
		backgroundColor: 'orange',
		opacity: 0.7,
		width: 30,
		height: 30,
		borderRadius: '50%'
	},
	card: {
		marginBottom: 5,
		position: "relative",
	},
	content: {
		width: "100%",
		padding: 10,
		paddingBottom: '0 !important'
	},
}

let BlurBox = ({
	width, classes, children, className, color
}) => {
	return (
		<div style={{ width: width, backgroundColor: color }} className={classNames(classes.blur, className)}>{children}</div>
	);
}
BlurBox = withStyles(styles)(BlurBox);

let CommentList = ({
	classes, scream
}) => {
	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<div className="scream-username">
					<div className={classNames(classes.blur, classes.profileImage)} >User's Profile</div>
					<div style={{ width: '100%' }}>
						<BlurBox width="25%">Handle</BlurBox>
						<BlurBox width="10%">CreatedAt</BlurBox>
					</div>
				</div>
				<BlurBox width="100%">Body</BlurBox>
				<BlurBox width="80%">Body</BlurBox>
			</CardContent>
		</Card>
	);
}
CommentList = withStyles(styles)(CommentList);

const CommentLoadingSkeleton = ({
	piece
}) => {

	return (
		<div>
			{Array(piece).fill(null).map((_, index) => (
				<CommentList key={index} />
			))}
		</div>
	);
}

export default CommentLoadingSkeleton;
