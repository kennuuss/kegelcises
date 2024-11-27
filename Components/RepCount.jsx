import React from 'react'
import * as SVG from '../src/SVGs'

function RepCount(props) {
	const eraceCount = () => {
		props.setCount(1)
		props.setIsSetStarted(true)
	}

	return (
		<div className='flex flex-col items-center gap-4'>
			<button
				className={`w-[64px] h-[64px] flex justify-center items-center   ${
					props.currentCount <= 1 && ' pointer-events-none opacity-0 '
				}`}
				onClick={eraceCount}
				onTouchStart={eraceCount}
			>
				{props.currentCount > 14 ? SVG.SVGRestart : SVG.SVGTrashBin}
			</button>
			<div className='text-[rgb(124,124,124)] text-[24px]'>
				{props.currentCount} / 15
			</div>
		</div>
	)
}

export default RepCount
