import React from 'react';
import { Scream } from '../components';
import { mockupScreams } from '../utils/mockupData';

const Home = () => {

	// ----- FETCHING SCREAMS -----

	return (
		<>
			<Scream screams={mockupScreams} />
		</>
	);
}

export default Home;