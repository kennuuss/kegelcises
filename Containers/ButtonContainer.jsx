import React, { useState, useEffect } from 'react'
import KegelsButton from '../Components/KegelsButton'
import { H1 } from '../Components/Text'
import RepCount from '../Components/RepCount'
import Warning from '../Components/Warning'
import ScrollBtn from '../Components/ScrollBtn';

function ButtonContainer(props) {
	const [holdMessageVisible, setHoldMessageVisible] = useState(false);

  useEffect(() => {
    if (props.isPressed && props.pressDuration >= 0) {
      const timer = setTimeout(() => {
        setHoldMessageVisible(true);
      }, 1000); // Показывать Hold! через 1 секунду

      return () => clearTimeout(timer); // Очистка таймера при изменении isPressed или pressDuration
    } else {
      setHoldMessageVisible(false); // Сбросить, если кнопка не зажата
    }
	}, [props.isPressed, props.pressDuration]);
	
	return (
		<div className='h-screen flex justify-between lg:justify-center lg:pb-28 py-32 lg:py-0 flex-col items-center'>
			<H1 className="text-center h-[168px] flex items-center">
      {props.isPressed
        ? props.pressDuration >= 5
          ? props.breathStage
          : holdMessageVisible
          ? 'Continue holding!'
          : ''
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
			<ScrollBtn className={`${props.isSetFinished ? ' block ' : ' hidden '}`} />
			<RepCount
				eraceCount={props.eraceCount}
				setIsSetStarted={props.setIsSetStarted}
				setIsSetFinished={props.setIsSetFinished}
				isSetFinished={props.isSetFinished}
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
