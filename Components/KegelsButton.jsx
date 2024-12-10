import React from 'react'
import Countdown from './Countdown'
import * as SVG from '../src/SVGs'

function KegelsButton(props) {
	return (
		<button
			onMouseDown={props.handleMouseDown}
			onMouseUp={props.handleMouseUp}
			onMouseLeave={props.handleMouseLeave}
			onTouchStart={(e) => {
				e.preventDefault(), props.handleMouseDown()
			}}
			onTouchEnd={(e) => {
				e.preventDefault(), props.handleMouseUp()
			}}
			onTouchCancel={(e) => {
				e.preventDefault(), props.handleMouseLeave()
			}}
			className={`w-[350px] h-[350px] flex hover:scale-105 transition-all duration-150 lg:active:scale-110 justify-center items-center 
				`} /* ${
					props.isResting || props.isSetFinished
						? ' pointer-events-none cursor-not-allowed '
						: ''
				} */
		>
			<span
				className={`transform flex justify-center items-center transition-all duration-150 rounded-full w-[244px] h-[244px] ${
					props.isResting || props.isSetFinished
						? ' bg-[#4E1CB4] '
						: ' bg-[#9B69FF]  '
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
			>
				<span
					className={` text-white ${!props.isSetFinished && ' opacity-0 '}`}
				>
					{SVG.SVGRestart}
				</span>{' '}
				<Countdown
					restDuration={props.restDuration}
					pressDuration={props.pressDuration}
				>
					{props.isResting ? props.restDuration : props.pressDuration}
				</Countdown>
			</span>
		</button>
	)
}

export default KegelsButton
