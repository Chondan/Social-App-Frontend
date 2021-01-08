import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Material UI stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

dayjs.extend(relativeTime);

// the 'classes' object
const styles = {
	card: {
		display: "flex",
		marginBottom: 20,
		justifyContent: "space-between",
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
	const { body, createdAt, userHandle, userImage } = scream;
	return (
		<Card className={classes.card}>
			<CardMedia title="profile's image" image={userImage} className={classes.image}/>
			<CardContent className={classes.content}>
				<Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">{userHandle}</Typography>
				<Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
				<Typography variant="body1">{body}</Typography>
			</CardContent>
		</Card>
	);
}
ScreamList = withStyles(styles)(ScreamList);

const Scream = ({
	screams
}) => {

	const recentScreamsMarkup = screams ? (
		screams.map(scream => <ScreamList key={scream.screamId} scream={scream} />)
	) : <div>Loading...</div>;

	return (
		<div>{recentScreamsMarkup}</div>
	);
}

export default Scream;
