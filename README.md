# Social Media App

## What should I do before coding?
- desing api and defind the shape of the response datas (Including errors).
- the relation between front-end and back-end such as the password or email pattern required for logging in or signing up.

## Material
- Firebase API Endpoint
	- api -> https://us-central1-social-media-app-a3e4f.cloudfunctions.net/api

## Additional Resources
- Authentication in Frontend Applications
	- link: https://www.telerik.com/blogs/authentication-in-frontend-applications

## Things to learn
- Redux
	- thunk, thunkAPI (createAsuncThunk)
	- compose, store enhancer

## Lesson Learned
- Importing components (`import { Link } from 'react-router-dom';` VS `import Link from 'react-router-dom/Link';`)
	- The latter may give you a better performance because importing this way doesn't need to load the whole module.
- Material UI -> https://material-ui.com
- React JS
	- to set up a base url -> set a `proxy` property's value to `<API BASE URL>`
- To access locale language of the user
	- `navigator.language` -> applied with -> `new Date().toLocaleString(navigator.language, { hour12: false })`
- Library: `dayjs`
	- Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
- Importing modules
	- Just only do the import tasks on the top of the file. If there is a block of code between the `import` statement, the error will be thrown.
- React built-in module: `prop-types`
	- `import PropTypes from 'prop-types'` -> use for checking props type.
- `novalidate` attribute (`noValidate` in React.js)
	- Indicate that the form is not to be validated on submit.
- How to kill a process running on particular port in Linux?
	- link: https://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux/32592965
- Material UI
	- `CircularProgress API`
	- Material UI Icons
- Authorization: JWT
	- need to check the signature to make sure that the payload has never been edited before.
		- to generate a JWT -> generate and store 'kid or key id' in the header and then generate a 'password or secret key' for this 'kid' and then store in out secret database.
		- when a user send the token to the server -> look at 'kid' and then get a secret key from it in our database to use it to verify a signature.
- Serialization
	- the process of converting an object into a stream of bytes to store the object or transmit it to memory, a database, or a file.
- Redux
	- Redux state doesn't remain after a page reload. `window.location.href = '/'` cause a page reload and it's not the correct way to programmatically navigate to another page when you use react-router. Instead of that you should use `this.props.history.push('/')`


## TODOS
- [ ] refresh scream at home page
- [ ] update imageUrl of all screams after users chage their profile image (need to fix the api to make it send the imageUrl back to the client)

VIDEO: 9:19:00