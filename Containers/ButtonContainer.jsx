import React from 'react'
import KegelsButton from '../Components/KegelsButton'
import { H1 } from '../Components/Text'
import RepCount from '../Components/RepCount'
import Warning from '../Components/Warning'

function ButtonContainer(props) {
	return (
		<div className='h-screen flex justify-between py-32 lg:py-0 flex-col items-center'>
			<H1 className=' text-center w-full '>
				{props.isPressed
					? props.pressDuration >= 5
						? props.breathStage
						: 'pass'
					: props.isResting
					? 'Rest'
					: props.isSetStarted
					? 'Tap to continue!'
					: props.isSetFinished
					? 'Set finished!'
					: 'Click to start!'}
			</H1>
			<KegelsButton
				handleMouseDown={props.handleMouseDown}
				handleMouseLeave={props.handleMouseLeave}
				handleMouseUp={props.handleMouseUp}
				pressDuration={props.pressDuration}
				restDuration={props.restDuration}
				isResting={props.isResting}
				isSetStarted={props.isSetStarted}
				isSetFinished={props.isSetFinished}
				currentCount={props.currentCount}
				eraceCount={props.eraceCount}
				isPressed={props.isPressed}
				breathStage={props.breathStage}
			/>
			<RepCount
				eraceCount={props.eraceCount}
				setIsSetStarted={props.setIsSetStarted}
				setIsSetFinished={props.setIsSetFinished}
				setRestDuration={props.setRestDuration}
				currentCount={props.currentCount}
				setCount={props.setCount}
			/>

			<Warning
				currentCount={props.currentCount}
				isWarningShowing={props.isWarningShowing}
				setIsWarningShowing={props.setIsWarningShowing}
			/>
		</div>
	)
}
export default ButtonContainer
