import React, { Fragment } from 'react';
import { Scream } from '../components';
import { mockupScreams } from '../utils/mockupData';

const Home = () => {

	// ----- FETCHING SCREAMS -----

	return (
		<Fragment>
			<Scream screams={mockupScreams} />
		</Fragment>
	);
}

export default Home;