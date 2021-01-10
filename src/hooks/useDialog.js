import { useState } from 'react';

const useDialog = (initialState) => {
	const [open, setOpen] = useState(initialState);

	const toggle = () => setOpen(!open);
	const openDialog = () => setOpen(true);
	const closeDialog = () => setOpen(false);

	return { open, toggle, openDialog, closeDialog };
}

export default useDialog;