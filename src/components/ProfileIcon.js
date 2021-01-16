import React, { Fragment, useState } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Slices
import { resetUserData } from '../redux/slices/userSlice';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
// Material UI
import withStyles from '@material-ui/core/styles/withStyles';

dayjs.extend(relativeTime);

const styles = {
	notifications: {
		position: 'absolute',
		right: '150%',
		top: '50%',
		color: 'black',
		backgroundColor: '#fff',
		width: '1000%',
		'& ul': {
			padding: 0,
			margin: 0,
			'& li': {
				listStyle: 'none',
				margin: 5,
				padding: 5,
				boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
			}
		},
		cursor: 'normal',
		transition: 'all 0.5s ease',
		borderRadius: 5,
		maxHeight: 600,
		overflowY: 'auto'
	},
	hide: {
		opacity: 0,
		right: '100%',
		transition: 'all 0.5s ease',
		height: 0
	},
	noti: {
		'&:hover ': {
			transform: 'translate(0, -2px)',
			transition: 'all 0.15s ease'
		},
		fontSize: 'small'
	},
	unread: {
		backgroundColor: 'rgba(0, 0, 0, 0.15)'
	},
	like: {
		color: '#f67e7d'
	},
	comment: {
		color: '#20639B'
	},
	notificationsBadge: {
		border: '1px solid red',
		color: '#fff',
		position: 'absolute',
		left: '-30%',
		top: '-10%',
		backgroundColor: '#E63946',
		borderRadius: '50%',
		display: 'inline-block',
		width: 15,
		height: 15,
		textAlign: 'center',
		fontSize: 'small',
	}
}

let Notifications = ({
	classes, show, onClick, notifications, onNotificationClick
}) => {

	return (
		<div onClick={e => onClick(e)} className={classNames(classes.notifications, show ? '' : classes.hide, 'notificationsBar')}>
			{show && <ul>
				{
					notifications.map(noti => {
						const { createdAt, read, sender, screamId, type } = noti;

						return (
							<li key={nanoid()} className={classNames(classes.noti, read ? '' : classes.unread)}
								onClick={() => onNotificationClick(screamId)}
							>
								<span>{`${sender} `}</span><span className={classes[type]}>{`${type} `}</span><span>{`on your scream ${dayjs(createdAt).fromNow()}`}</span>
							</li>
						);
					})
				}
			</ul>}
		</div>
	);
}
Notifications = withStyles(styles)(Notifications);

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

let ProfileIcon = ({
	isAuthenticated, classes
}) => {
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

	const onNotificationClick = (screamId) => {
		history.push(`/scream/${screamId}`);
		setShowNotifications(false);
	}

	return (
		<Fragment>
			<div className="slider">
				<span className="profile-icon" 
					style={{ backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover' }}
					onClick={toggleNotifications} 
				>
					icon
					{notifications.length > 0 && <span className={classes.notificationsBadge}>{notifications.length}</span>}
					<Notifications onNotificationClick={onNotificationClick} notifications={notifications} onClick={e => e.stopPropagation()} show={showNotifications} />
				</span>
				<span className={classNames('profile-username', isShowSlider ? 'hilight' : '')} onClick={onUserNameClick}>{handle}</span>
				<Slider show={isShowSlider && isAuthenticated} onUserNameClick={onUserNameClick} handle={handle} />
			</div>
		</Fragment>
	);
}
ProfileIcon = withStyles(styles)(ProfileIcon);

export default ProfileIcon;