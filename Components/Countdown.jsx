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
/* pressDuration > 0 || restDuration >= 1
	? 'text-[58px] mx-auto select-none dark:text-white pointer-events-none'
	: 'opacity-0 text-[58px] mx-auto select-none pointer-events-none' */
