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
	}
};

export { theme, styles };