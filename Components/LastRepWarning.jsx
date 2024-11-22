import React, { useEffect } from 'react'
import H1 from './H1'

function LastRepWarning(props) {
	useEffect(() => {
		if (props.isLastRepWarningShowing) {
			const timer = setTimeout(() => {
				props.setIsLastRepWarningShowing(false)
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [props.isLastRepWarningShowing, props.setIsLastRepWarningShowing])

	const handleTouchStart = (e) => {
		e.preventDefault()
		props.setIsLastRepWarningShowing(false)
	}

	return (
		<button
			onClick={() => props.setIsLastRepWarningShowing(false)}
			onTouchStart={() => handleTouchStart()}
			className={`flex justify-center items-center h-[15vh] transition-all duration-150 ease-in-out absolute top-[20px] left-[20px] right-[20px] rounded-3xl 
				bg-[${props.isSetFinished ? '#12BF46' : '#EDB211'}] 
				${props.isLastRepWarningShowing ? ' translate-y-0 ' : ' translate-y-[-200%] '}`}
		>
			<H1 className=' text-white '>
				{props.isLastRepWarningShowing ? 'Последнее повторение!' : ''}
				{props.isSetFinished ? 'Сет завершен!' : ''}
			</H1>
		</button>
	)
}
export default LastRepWarning
