import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
// Slices
import { resetUserData } from '../redux/slices/userSlice';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Utils

const ProfileIcon = ({
	isAuthenticated
}) => {
	const userData = useSelector(state => state.user);
	const { credentials: { handle, imageUrl } } = userData;

	const [isShowSlider, setIsShowSlider] = useState(false);

	const onUserNameClick = () => {
		if (isShowSlider) return setIsShowSlider(false);
		setIsShowSlider(true);
	}

	return (
		<Fragment>
			<div className="slider">
				<span className="profile-icon" 
					style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }} 
				>
					icon
				</span>
				<span className={classNames('profile-username', isShowSlider ? 'hilight' : '')} onClick={onUserNameClick}>{handle}</span>
				<Slider show={isShowSlider && isAuthenticated} onUserNameClick={onUserNameClick} handle={handle} />
			</div>
		</Fragment>
	);
}

const Slider = ({
	show, onUserNameClick, handle
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onProfileClick = () => {
		history.push(`/users/${handle}`);
		onUserNameClick();
	}

	return (
		<Fragment>
			<span className={classNames('slider-menu', !show ? 'hide' : '')} onClick={onProfileClick} >Profile</span>
			<span className={classNames('slider-menu', !show ? 'hide' : '', 'logout')} onClick={() => dispatch(resetUserData())} >Logout</span>
		</Fragment>
	);
}

export default ProfileIcon;