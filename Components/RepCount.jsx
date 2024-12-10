import React from 'react'
import * as SVG from '../src/SVGs'

function RepCount(props) {
	return (
		<div className='flex h-[64px] lg:flex-row flex-col items-center lg:gap-0 gap-4 lg:absolute lg:bottom-2 lg:right-4'>
			<button
				className={`w-[64px] active:scale-125 hover:scale-110 transition-all duration-150 h-[64px] dark:text-[#B5B5B5] text-[#7C7C7C] flex justify-center items-center ${props.currentCount === 15 && ' hidden '}   ${
					props.currentCount <= 1 && ' pointer-events-none opacity-30 '
				}`}
				onClick={props.eraceCount}
				onTouchStart={props.eraceCount}
			>
				{SVG.SVGTrashBin}
			</button>
			<div className='text-[rgb(124,124,124)] select-none dark:text-white text-[24px] w-[74.25px] flex justify-center lg:justify-end'>
				{props.currentCount} / 15
			</div>
		</div>
	)
}

export default RepCount
