import React from 'react'

function Countdown({ restDuration, pressDuration, children }) {
	return (
		<h3
			className={
				pressDuration > 0 || restDuration >= 1
					? 'text-[58px] mx-auto select-non dark:text-white pointer-events-none'
					: 'opacity-0 text-[58px] mx-auto select-none pointer-events-none'
			}
		>
			{children}
		</h3>
	)
}

export default Countdown
