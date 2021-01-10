import React, { Fragment } from 'react';

// Material UI
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const MyButton = ({
	children, tip, tipClassName, btnClassName, onClick, tooltipPlacement
}) => {
	return(
		<Fragment>
			<Tooltip title={tip} className={tipClassName} placement={tooltipPlacement}>
				<IconButton onClick={onClick} className={btnClassName}>
					{children}
				</IconButton>
			</Tooltip>
		</Fragment>
	);
}

export default MyButton;