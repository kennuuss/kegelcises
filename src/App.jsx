import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'
import Warning from '../Components/Warning'

function App() {
	const [currentCount, setCount] = useState(1)
	const [isPressed, setIsPressed] = useState(false)
	const [isSetStarted, setIsSetStarted] = useState(false)
	const [isSetFinished, setIsSetFinished] = useState(false)
	const [pressDuration, setPressDuration] = useState(0)
	const [intervalId, setIntervalId] = useState(null)
	const [isItRestNow, setIsItRestNow] = useState(false)
	const [restDuration, setRestDuration] = useState(0)
	const [isWarningShowing, setIsWarningShowing] = useState(false)
	const [restId, setRestId] = useState(null)

	const [breathStage, setBreathStage] = useState('')
	const [breathTimer, setBreathTimer] = useState(null)

	const startMeditation = () => {
		let stage = 'Вдох' // 0 - вдох, 1 - задержка, 2 - выдох
		setBreathStage('Вдох') // Начинаем с вдоха
		setBreathTimer(
			setInterval(
				() => {
					if (stage === 'Вдох') {
						setBreathStage('Вдох')
						stage = 'Задержка'
					} else if (stage === 'Задержка') {
						setBreathStage('Задержка')
						stage = 'Выдох'
					} else {
						setBreathStage('Выдох')
						stage = 'Выдох'
					}
				},
				stage === 'Вдох' ? 4000 : stage === 1 ? 1000 : 8000
			) // Меняем интервалы
		)
	}

	useEffect(startMeditation, [isPressed])

	const stopMeditation = () => {
		clearInterval(breathTimer)
		setBreathStage(null)
	}

	const startTimer = () => {
		setPressDuration(0)
		const id = setInterval(() => {
			setPressDuration((prev) => prev + 1)
		}, 1000)
		setIntervalId(id)
	}

	const startRestTimer = () => {
		const id = setInterval(() => {
			setRestDuration((prev) => {
				if (prev <= 1) {
					clearInterval(id)
					setIsItRestNow(false)
				}
				return prev - 1
			})
		}, 1000)
		setRestId(id)
	}

	const stopTimer = () => {
		clearInterval(intervalId)
		setIsPressed(false)
		setPressDuration(0)

		if (currentCount <= 14) {
			setCount((prev) => prev + 1)
		}

		if (currentCount === 14) {
			setIsSetFinished(true)
			setIsSetStarted(false)
		}

		currentCount === 13 && setIsWarningShowing(true)
	}

	const handleMouseDown = () => {
		currentCount >= 1 && setIsSetStarted(true)
		setIsPressed(true)
		startTimer()
	}

	const handleMouseUp = () => {
		if (pressDuration >= 5) {
			const calculatedRestDuration = pressDuration * 2
			const cappedRestDuration =
				calculatedRestDuration >= 60 ? 60 : calculatedRestDuration
			setRestDuration(cappedRestDuration)
			setIsItRestNow(true)
			startRestTimer()
			console.log('Время отдыха: ', cappedRestDuration)
		}

		if (isPressed) {
			stopTimer()
		}
	}

	const handleMouseLeave = () => {
		if (pressDuration >= 5) {
			handleMouseUp()
		}
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
			clearInterval(restId)
		}
	}, [intervalId, restId])

	return (
		<main className='bg-white flex flex-col justify-center items-center py-[10vh] md:py-0 gap-[10vh] h-[100vh]'>
			<RepCount
				setIsSetStarted={setIsSetStarted}
				setIsSetFinished={setIsSetFinished}
				currentCount={currentCount}
				setCount={setCount}
			/>
			<H1>
				{isSetStarted
					? isItRestNow
						? `Отдых`
						: breathStage
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
			<Countdown pressDuration={pressDuration}>
				{isItRestNow ? restId : pressDuration}
			</Countdown>
			{currentCount === 14 && (
				<Warning
					currentCount={currentCount}
					isWarningShowing={isWarningShowing}
					setIsWarningShowing={setIsWarningShowing}
					message='Последнее повторение!'
				/>
			)}
			{currentCount === 15 && (
				<Warning
					currentCount={currentCount}
					isWarningShowing={isWarningShowing}
					setIsWarningShowing={setIsWarningShowing}
					message='Сет завершен!'
				/>
			)}
		</main>
	)
}

export default App
