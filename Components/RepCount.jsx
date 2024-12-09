import React from 'react'
import * as SVG from '../src/SVGs'

function RepCount(props) {
	const eraceCount = () => {
		props.setCount(1)
		props.setRestDuration(0)
		props.setIsSetStarted(true)
		props.setIsSetFinished(false)
	}

	return (
		<div className='flex lg:flex-row flex-col items-center lg:gap-0 gap-4 lg:absolute lg:bottom-2 lg:right-4'>
			<button
				className={`w-[64px] active:scale-125 hover:scale-110 transition-all duration-150 h-[64px] dark:text-[#B5B5B5] text-[#7C7C7C] flex justify-center items-center   ${
					props.currentCount <= 1 && ' pointer-events-none opacity-0 '
				}`}
				onClick={eraceCount}
				onTouchStart={eraceCount}
			>
				{props.currentCount > 14 ? SVG.SVGRestart : SVG.SVGTrashBin}
			</button>
			<div className='text-[rgb(124,124,124)] dark:text-white text-[24px]'>
				{props.currentCount} / 15
			</div>
		</div>
	)
}

export default RepCount
