import React from 'react'
import KegelsButton from '../Components/KegelsButton'
import {H1} from '../Components/Text'
import RepCount from '../Components/RepCount'
import Warning from '../Components/Warning'

function ButtonContainer(props) {
  return (
    <div className='h-screen flex items-center pb-40'>
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