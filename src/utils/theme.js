const theme = {
	palette: {
		primary: {
			main: '#303030',
			light: 'rgba(255, 255, 255, 0.3)',
			dark: 'rgba(0, 0, 0, 0.87)',
			contrastText: '#fff'
		},
		secondary: {
			main: '#f48fb1',
			light: '#f6a5c0',
			dark: '#aa647b',
			contrastText: '#000'
		},
	},
};

const styles = {
	form: {
		textAlign: "center",
	},
	pageTitle: {
		margin: '10px auto 10px auto',
		borderBottom: '2px solid black'
	},
	image: {
		width: 100,
		margin: '20px auto 20px auto',
	},
	textField: {
		margin: '10px auto 10px auto',
	},
	button: {
		marginTop: '20px',
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: 10,
	},
	block: {
		display: 'block',
		margin: '10px auto 10px auto'
	},
};

const profileStyles = {
	paper: {
		padding: 10,
		height: '100%'
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& .btn': {
				position: 'absolute',
				top: '80%',
				left: '70%',
				'&:hover': {
					transform: 'scale(1.2)',
					transition: 'transform 0.2s ease-out'
				}
			},
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%',
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: theme.palette.primary.main
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		},
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	}
};

export { theme, styles, profileStyles };