import React, { useEffect, useState } from 'react'
import H1 from './H1'

function Warning(props) {
	const [isFirstWarningShowing, setIsFirstWarningShowing] = useState(false)
	const [isSecondWarningShowing, setIsSecondWarningShowing] = useState(false)

	useEffect(() => {
		// Скрыть предупреждения после определенного времени
		if (isFirstWarningShowing || isSecondWarningShowing) {
			const timer = setTimeout(() => {
				setIsFirstWarningShowing(false)
				setIsSecondWarningShowing(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [isFirstWarningShowing, isSecondWarningShowing])

	useEffect(() => {
		// Обновление состояния на основании currentCount
		if (props.currentCount === 1) {
			setIsFirstWarningShowing(false)
			setIsSecondWarningShowing(false)
		} else if (props.currentCount === 14) {
			setIsFirstWarningShowing(true)
		} else if (props.currentCount === 15) {
			setIsFirstWarningShowing(false)
			setIsSecondWarningShowing(true)
		}
	}, [props.currentCount])

	const handleTouchStart = (e) => {
		e.preventDefault()
		setIsFirstWarningShowing(false)
		setIsSecondWarningShowing(false)
	}

	return (
		<>
			{/* Первое окно */}
			<button
				onClick={() => setIsFirstWarningShowing(false)}
				onTouchStart={(e) => handleTouchStart(e)}
				className={`flex justify-center items-center
					lg:w-[40vw] lg:mx-auto h-[15vh] py-8 rounded-3xl
					transition-all duration-500 ease-in-out
					absolute top-[20px] left-[20px] right-[20px]
					${isFirstWarningShowing ? 'translate-y-0' : 'translate-y-[-200%]'}
					bg-[#E0C477]`}
			>
				<H1 className='text-white'>Последнее повторение!</H1>
			</button>

			{/* Второе окно */}
			<button
				onClick={() => setIsSecondWarningShowing(false)}
				onTouchStart={(e) => handleTouchStart(e)}
				className={`flex justify-center items-center
					lg:w-[40vw] lg:mx-auto h-[15vh] py-8 rounded-3xl
					transition-all duration-500 ease-in-out
					absolute top-[20px] left-[20px] right-[20px]
					${isSecondWarningShowing ? 'translate-y-0' : 'translate-y-[-200%]'}
					bg-[#74BA89]`}
			>
				<H1 className='text-white'>Сет завершен!</H1>
			</button>
		</>
	)
}

export default Warning
