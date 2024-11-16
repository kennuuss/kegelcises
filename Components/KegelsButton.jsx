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
			className='w-[244px] h-[244px]'
		>
			<div
				className={`bg-[#9B69FF] transform transition-all duration-100 ease-in mx-auto rounded-full w-[244px] h-[244px] 
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
