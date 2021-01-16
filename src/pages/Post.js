import React, { useState, useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

// Components
import { ScreamLoadingSkeleton, ScreamList } from '../components';
// Slices
import { selectScreamById } from '../redux/slices/screamSlice';
// Redux 
import { useSelector } from 'react-redux';

dayjs.extend(relativeTime);

const Post = ({
	match
}) => {
	const { screamId } = match.params;
	const [scream, setScream] = useState();
	const [loading, setLoading] = useState(true);
	const isScreamLoaded = useSelector(state => state.screams.loaded);

	const loadedScream = useSelector(state => selectScreamById(state, screamId));

	useEffect(() => {
		if (isScreamLoaded) return console.log("Scream is already loaded");
		setLoading(true);
		axios({ method: 'get', url: `/scream/${screamId}` })
		.then(res => res.data)
		.then(data => {
			setScream(data);
			setLoading(false);
		})
		.catch(err => {
			setScream(null);
			setLoading(false);
		})
	}, [isScreamLoaded, screamId]);
 
	return (
		<Fragment>
			{ 	
				isScreamLoaded ? <ScreamList scream={loadedScream} /> :
				loading ? <ScreamLoadingSkeleton piece={1} /> : 
				scream === null ? <div>Scream not found</div> : 
				<ScreamList scream={scream} />
			}
		</Fragment>
	);
}

export default Post;
