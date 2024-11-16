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
			className='bg-[#9B69FF] mx-auto rounded-full w-[244px] h-[244px]'
		/>
	)
}

export default KegelsButton
