import React from 'react'

function KegelsButton(props) {
	return (
		<button
			onMouseUp={() => {
       () => props.setCount(props.currentCount + 1)
			}}
			className='bg-[#9B69FF] mx-auto rounded-full w-[244px] h-[244px]'
		/>
	)
}

export default KegelsButton
