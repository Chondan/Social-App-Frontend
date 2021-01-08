import React from 'react';

// Material UI
import Grid from '@material-ui/core/Grid';

// Components
import { Scream } from '../components';

// Utils
import { mockupScreams } from '../utils/mockupData';

const Profile = () => {
	return (
		<Grid container spacing={2} >
			<Grid item xs={4}>
				Profile
			</Grid>
			<Grid item xs={8} >
				<Scream screams={mockupScreams} />
			</Grid>
		</Grid>
	);
}

export default Profile;