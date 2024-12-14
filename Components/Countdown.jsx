import React from 'react'

function Countdown({ restDuration, pressDuration, children }) {
	return (
		<h3
			className={`${pressDuration > 0 || restDuration > 0 ? ' block ' : ' hidden '} text-[58px] select-none text-white`}
		>
			{children}
		</h3>
	)
}

export default Countdown