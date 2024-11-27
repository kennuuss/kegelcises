import React from 'react'

function KegelsButton(props) {
	const handleTouchStart = (e) => {
		e.preventDefault()
		props.handleMouseDown()
	}

	const handleTouchEnd = (e) => {
		e.preventDefault()
		props.handleMouseUp()
	}

	const handleTouchCancel = (e) => {
		e.preventDefault()
		props.handleMouseLeave()
	}

	return (
		<button
			onMouseDown={props.handleMouseDown}
			onMouseUp={props.handleMouseUp}
			onMouseLeave={props.handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchCancel}
			className={`w-[350px] h-[350px] flex active:scale-110 hover:scale-105 transition-all duration-150 ease-in justify-center items-center 
				${
					props.isItRestNow || props.isSetFinished ? ' pointer-events-none cursor-not-allowed ' : ''
				}
				${props.isPulsing && ' animate-pulse '}`}
		>
			<div
				className={`bg-[#9B69FF] dark:bg-[#4C0AD0] transform transition-all duration-150 ease-in rounded-full w-[244px] h-[244px] ${
					props.isItRestNow && ' hover:bg-opacity-50 '
				}
					scale-[${
						props.pressDuration === 0
							? ' scale-[1] '
							: props.pressDuration === 1
							? ' scale-[0.90] '
							: props.pressDuration === 2
							? ' scale-[0.80] '
							: props.pressDuration === 3
							? ' scale-[0.70] '
							: ' scale-[0.70] '
					}]`}
			/>
		</button>
	)
}

export default KegelsButton
