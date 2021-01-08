import React, { useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';

// Slices
import { resetUserData } from '../redux/slices/userSlice';

// Redux
import { useDispatch } from 'react-redux';

// Utils
import { mockupUserData } from '../utils/mockupData';

const ProfileIcon = ({
	isAuthenticated
}) => {
	const { handle, imageUrl } = mockupUserData;

	const [isShowLogout, setIsShowLogout] = useState(false);

	const onIconClick = () => {
		if (isShowLogout) return setIsShowLogout(false);
		setIsShowLogout(true);
	}

	return (
		<div className="slider">
			<span className="profile-icon" style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}>icon</span>
			<span className={classNames('profile-username', isShowLogout ? 'hilight' : '')} onClick={onIconClick}>{handle}</span>
			<Slider show={isShowLogout && isAuthenticated} />
		</div>
	);
}

const Slider = ({
	show
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	return (
		<>
			<span className={classNames('slider-menu', !show ? 'hide' : '')} onClick={() => history.push('/profile')} >Profile</span>
			<span className={classNames('slider-menu', !show ? 'hide' : '', 'logout')} onClick={() => dispatch(resetUserData())} >Logout</span>
		</>
	);
}

export default ProfileIcon;