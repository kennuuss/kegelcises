import React from 'react'

function Countdown({ pressDuration, children }) {
	return (
		<div
			className={pressDuration >0 ? 'text-[58px] mx-auto select-none pointer-events-none' : 'opacity-0 text-[58px] mx-auto select-none pointer-events-none'}
		>
			{children}
		</div>
	)
}

export default Countdown
