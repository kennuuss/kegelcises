import React from 'react'

function KegelsButton(props) {
	return (
		<button
			onMouseDown={props.handleMouseDown}
			onMouseUp={props.handleMouseUp}
			onMouseLeave={props.handleMouseLeave}
			className='bg-[#9B69FF] mx-auto rounded-full w-[244px] h-[244px]'
		/>
	)
}

export default KegelsButton
