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
		color: 'transparent'
	},
	profileImage: {
		backgroundColor: 'orange',
		opacity: 0.7
	},
	card: {
		marginBottom: 10,
		position: "relative",
	},
	content: {
		width: "100%",
		padding: '15px !important',
	}
}

let BlurBox = ({
	width, classes, children, className, color, size
}) => {
	return (
		<div style={{ width: width, backgroundColor: color, fontSize: size ? size : 'normal' }} className={classNames(classes.blur, className)}>{children}</div>
	);
}
BlurBox = withStyles(styles)(BlurBox);

let ScreamSkeletonList = ({
	classes, scream
}) => {
	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<div className="scream-username">
					<div className={classNames("scream-profile-icon", classes.blur, classes.profileImage)} >User's Profile</div>
					<div style={{ width: '100%' }}>
						<BlurBox width="30%">X</BlurBox>
						<BlurBox size="small" width="15%">X</BlurBox>
					</div>
				</div>
				<BlurBox width="100%">X</BlurBox>
				<BlurBox width="80%">X</BlurBox>
				<BlurBox width="15%" color="#20639B">X</BlurBox>
				<BlurBox width="30%">X</BlurBox>
			</CardContent>
		</Card>
	);
}
ScreamSkeletonList = withStyles(styles)(ScreamSkeletonList);

const ScreamLoadingSkeleton = ({
	piece
}) => {

	return (
		<div>
			{Array(piece).fill(null).map((_, index) => (
				<ScreamSkeletonList key={index} />
			))}
		</div>
	);
}

export default ScreamLoadingSkeleton;
