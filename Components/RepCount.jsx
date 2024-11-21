import React from 'react'
import * as SVG from '../src/SVGs'

function RepCount({ children, setCount, currentCount }) {
	const eraceCount = () => {
		setCount(1)
	}
	return (
		<div className='flex flex-col gap-4'>
			<button
				className='w-[32px] h-[32px] mx-auto'
				onClick={eraceCount}
				onTouchStart={eraceCount}
			>
				{currentCount > 1 && SVG.SVGTrashBin}
			</button>
			<div className='text-[rgb(124,124,124)] text-[24px]'>{children} / 15</div>
		</div>
	)
}

export default RepCount
