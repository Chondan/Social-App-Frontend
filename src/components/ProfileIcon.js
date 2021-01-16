import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Components
import Notifications from './Notifications';
// Slices
import { resetUserData } from '../redux/slices/userSlice';
import { fetchMarkNotificationAsRead } from '../redux/slices/notificationSlice';
// Redux
import { useDispatch, useSelector } from 'react-redux';
// Material UI
import withStyles from '@material-ui/core/styles/withStyles';

dayjs.extend(relativeTime);

const styles = {
	notificationsBadge: {
		border: '1px solid red',
		color: '#fff',
		position: 'absolute',
		left: '-30%',
		top: '-10%',
		backgroundColor: '#E63946',
		borderRadius: '50%',
		width: 15,
		height: 15,
		fontSize: 'x-small',
		fontWeight: 'bold',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	}
}

const Slider = ({
	show, onUserNameClick, onProfileClick, logout
}) => {

	return (
		<Fragment>
			<span className={classNames('slider-menu', !show ? 'hide' : '')} onClick={onProfileClick} >Profile</span>
			<span className={classNames('slider-menu', !show ? 'hide' : '', 'logout')} onClick={logout} >Logout</span>
		</Fragment>
	);
}

let ProfileIcon = ({
	isAuthenticated, classes
}) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const notifications = useSelector(state => state.user.notifications);

	const [showNotifications, setShowNotifications] = useState(false);

	const userData = useSelector(state => state.user);
	const { credentials: { handle, imageUrl } } = userData;

	const [isShowSlider, setIsShowSlider] = useState(false);

	const onUserNameClick = () => {
		if (isShowSlider) return setIsShowSlider(false);
		setIsShowSlider(true);
	}

	const toggleNotifications = (e) => {
		setShowNotifications(show => !show);
	}

	const onNotificationClick = (screamId, notificationId) => {
		dispatch(fetchMarkNotificationAsRead(notificationId));
		history.push(`/scream/${screamId}`);
		setShowNotifications(false);
	}

	const onProfileClick = () => {
		history.push(`/users/${handle}`);
		onUserNameClick();
	}

	const logout = () => {
		dispatch(resetUserData());
	}

	const notificationsUnread = notifications.filter(noti => !noti.read).length;

	return (
		<Fragment>
			<div className="slider">
				<span className="profile-icon" 
					style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
					onClick={toggleNotifications} 
				>
					icon
					{
						notifications.length > 0 && 
						<span className={classes.notificationsBadge} style={{ opacity: notificationsUnread > 0 ? 1 : 0, transition: 'all 1s ease' }}>
							<span>{
								(notificationsUnread < 100 ? 
								notificationsUnread : '99+')
							}</span>
						</span>
					}
					<Notifications onNotificationClick={onNotificationClick} 
						notifications={notifications} onClick={e => e.stopPropagation()} 
						show={showNotifications}
					/>
				</span>
				<span className={classNames('profile-username', isShowSlider ? 'hilight' : '')} onClick={onUserNameClick}>{handle}</span>
				<Slider show={isShowSlider && isAuthenticated} onUserNameClick={onUserNameClick} 
					onProfileClick={onProfileClick} logout={logout}
				/>
			</div>
		</Fragment>
	);
}
ProfileIcon = withStyles(styles)(ProfileIcon);

export default ProfileIcon;