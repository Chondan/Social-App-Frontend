import { useState } from 'react';

const useInput = (initialValue) => {
	const [input, setInput] = useState(initialValue);

	const onInputChange = (e) => {
		setInput(e.target.value);
	}

	return { input, onInputChange };
}

export default useInput;