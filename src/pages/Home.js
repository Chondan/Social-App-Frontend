import React, { Fragment, useEffect } from 'react';
import { Scream } from '../components';

// Slices 
import { fetchScreams, selectScreams } from '../redux/slices/screamSlice';

// Redux
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {

	const dispatch = useDispatch();
	const screams = useSelector(selectScreams);

	// ----- FETCHING SCREAMS -----
	useEffect(() => {
		dispatch(fetchScreams());
	}, [dispatch]);

	return (
		<Fragment>
			<Scream screams={screams} />
		</Fragment>
	);
}

export default Home;