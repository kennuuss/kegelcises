import React from 'react'
import KegelsButton from '../Components/KegelsButton'
import H1 from '../Components/H1'
import RepCount from '../Components/RepCount'
import Warning from '../Components/Warning'

function ButtonContainer(props) {
  return (
    <div className=''>
      <KegelsButton
        handleMouseDown={props.handleMouseDown}
        handleMouseLeave={props.handleMouseLeave}
        handleMouseUp={props.handleMouseUp}
        pressDuration={props.pressDuration}
        restDuration={props.restDuration}
        isResting={props.isResting}
        isSetFinished={props.isSetFinished}
        currentCount={props.currentCount}
        eraceCount={props.eraceCount}
      />
      <H1>
        {props.isPressed
          ? props.pressDuration >= 5
            ? props.breathStage
            : 'pass'
          : props.isResting
          ? 'Rest'
          : props.isSetStarted
          ? 'Tap to continue!'
          : props.isSetFinished
          ? 'pass'
          : /* `Nice job!` */
            'Tap to start! '}
      </H1>

      {/* //! то, что находится не в порядке страницы: */}
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