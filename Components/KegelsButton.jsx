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
			className={`bg-[#9B69FF] mx-auto rounded-full w-[244px] h-[244px] 
				scale-[${
					props.pressDuration === 0
						? ' scale-100 '
						: props.pressDuration === 1
						? ' scale-90 '
						: props.pressDuration === 2
						? ' scale-75 '
						: props.pressDuration === 3
						? ' scale-50 '
						: ' scale-50 '
						
				}]`}
		/>
	)
}

export default KegelsButton
