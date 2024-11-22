import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'
import LastRepWarning from '../Components/LastRepWarning'

function App() {
	const [currentCount, setCount] = useState(1)
	const [isPressed, setIsPressed] = useState(false)
	const [isLastRepWarningShowing, setIsLastRepWarningShowing] = useState(false)
	const [isSetStarted, setIsSetStarted] = useState(false)
	const [isSetFinished, setIsSetFinished] = useState(false)
	const [pressDuration, setPressDuration] = useState(0)
	const [intervalId, setIntervalId] = useState(null)
	const [isItRestNow, setIsItRestNow] = useState(false)
	const [restDuration, setRestDuration] = useState(0)
	const calculatedRestDuration = pressDuration * 2

	const startTimer = () => {
		setPressDuration(0)
		const id = setInterval(() => {
			setPressDuration((prev) => prev + 1)
		}, 1000)
		setIntervalId(id)
	}

	const stopTimer = () => {
		clearInterval(intervalId)
		setIsPressed(false)

		setPressDuration(0)

		if (currentCount <= 14) {
			setCount((prev) => prev + 1)
		}

		currentCount === 13 && setIsLastRepWarningShowing(true)
		currentCount === 14 && setIsSetFinished(true)
		currentCount === 14 && setIsSetStarted(false)
	}

	const handleMouseDown = () => {
		currentCount >= 1 && setIsSetStarted(true)
		setIsPressed(true)
		startTimer()
	}

	const handleMouseUp = () => {
		if (pressDuration >= 1) {
			const calculatedRestDuration = pressDuration * 2
			setRestDuration(calculatedRestDuration)
			setIsItRestNow(true)
			console.log('Время отдыха: ', calculatedRestDuration)
		} else {
			console.log('Без отдыха так как длительность зажатия меньше 1 секунды')
		}

		if (isPressed) {
			stopTimer()
		}
	}

	const handleMouseLeave = () => {
		const calculatedRestDuration = pressDuration * 2
		calculatedRestDuration > 0 && handleMouseUp()
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
		}
	}, [intervalId])

	return (
		<div className='bg-white flex flex-col justify-center items-center gap-[10%] h-[100vh]'>
			<RepCount
				setIsSetStarted={setIsSetStarted}
				setIsSetFinished={setIsSetFinished}
				currentCount={currentCount}
				setCount={setCount}
			/>
			<H1>
				{isSetStarted
					? isItRestNow
						? `Отдых ${calculatedRestDuration} секунд`
						: 'Вдох'
					: isSetFinished
					? 'Сет завершен!'
					: 'Нажми чтобы начать!'}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
				pressDuration={pressDuration}
				isPressed={isPressed}
				isItRestNow={isItRestNow}
			/>
			<Countdown pressDuration={pressDuration}>{pressDuration}</Countdown>
			<LastRepWarning
				currentCount={currentCount}
				isLastRepWarningShowing={isLastRepWarningShowing}
				setIsLastRepWarningShowing={setIsLastRepWarningShowing}
				isSetFinished={isSetFinished}
			/>
		</div>
	)
}

export default App
