const AnimationMessage = ({
	message
}) => {
	return (
		<div className="msg-animation">
			{message.split('').map((alphabet, index) => (
				<span className='loader' key={index} style={{ animation: `loading ${0.3 * message.length}s linear ${index * 0.15}s`, margin: '2px' }}>{alphabet}</span>	
			))}
		</div>
	);
};

export default AnimationMessage;