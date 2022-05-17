import React from 'react'

const Progressbar = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 50,
		margin: 10
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	borderRadius:50,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 15,
		color: 'white',
		fontWeight: 900
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`${progress}%`}</span>
	</div>
	</div>
	)
}

export default Progressbar;
