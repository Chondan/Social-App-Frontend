import React from 'react';
import classNames from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Redux
import { nanoid } from '@reduxjs/toolkit';

// Material UI
import withStyles from '@material-ui/core/styles/withStyles';

dayjs.extend(relativeTime);

const styles = {
	notifications: {
		position: 'absolute',
		// right: '150%',
		// top: '50%',
		right: '-400%',
		top: '120%',
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
		// right: '100%',
		top: '50%',
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
}

let Notifications = ({
	classes, show, onClick, notifications, onNotificationClick
}) => {

	return (
		<div onClick={e => onClick(e)} className={classNames(classes.notifications, show ? '' : classes.hide, 'notificationsBar')}>
			{show && <ul>
				{
					notifications.map(noti => {
						const { createdAt, read, sender, screamId, type, notificationId } = noti;

						return (
							<li key={nanoid()} className={classNames(classes.noti, read ? '' : classes.unread)}
								onClick={() => onNotificationClick(screamId, notificationId)}
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

export default Notifications;