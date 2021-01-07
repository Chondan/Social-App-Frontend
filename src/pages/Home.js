import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { Scream } from '../components';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Slice
import { fetchUserData } from '../redux/slices/userSlice';

const mockupScreams = [
	{
		body: "Hello, This is my first scream. How are you doing?",
		screamId: Date.now(),
		userHandle: 'chondan',
		createdAt: new Date('01/01/2021').toISOString(),
		userImage: `https://raw.githubusercontent.com/Chondan/Social-App/main/Assets/default-profile.png`,
		likeCount: 5,
		commentCount: 2
	}
];

const Home = () => {

	const [screams, setScreams] = useState(mockupScreams);

	// useEffect(() => {
	// 	return;
	// 	axios({
	// 		method: 'get',
	// 		url: '/screams'
	// 	})
	// 	.then(response => {
	// 		console.log(response.data);
	// 		setScreams(response.data);
	// 	})
	// 	.catch(err => console.error(err));
	// }, []);

	const recentScreamsMarkup = screams ? (
		screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
	) : <div>Loading...</div>;

	return (
		<Grid container spacing={6}>
			<Grid item sm={8} xs={12}>
				{recentScreamsMarkup}
			</Grid>
			<Grid item sm={4} xs={12}>
				<p>Profile...</p>
			</Grid>
		</Grid>
	);
}

export default Home;