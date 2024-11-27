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
	const [isPulsing, setIsPulsing] = useState(false)
	const [breathStage, setBreathStage] = useState('')
	const [breathTimer, setBreathTimer] = useState(null)

	useEffect(() => {
		if (!isItRestNow) {
			stopMeditation()
		}
	}, [isItRestNow])

	const startMeditation = () => {
		let stage = 'Вдох'
		let counter = 0
		setBreathStage('Вдох')

		const id = setInterval(() => {
			counter++
			if (stage === 'Вдох' && counter === 4) {
				setBreathStage('Задержка')
				stage = 'Задержка'
				counter = 0
			} else if (stage === 'Задержка' && counter === 7) {
				setBreathStage('Выдох')
				stage = 'Выдох'
				counter = 0
			} else if (stage === 'Выдох' && counter === 8) {
				setBreathStage('Вдох')
				stage = 'Вдох'
				counter = 0
			}
		}, 1000)

		setBreathTimer(id)
	}

	useEffect(startMeditation, [isPressed])

	const stopMeditation = () => {
		if (breathTimer) {
			clearInterval(breathTimer)
			setBreathTimer(null)
		}
		setBreathStage(null)
	}

	const startTimer = () => {
		setPressDuration(0)
		const id = setInterval(() => {
			setPressDuration((prev) => {
				const newDuration = prev + 1
				if (newDuration > 3) {
					setIsPulsing(true)
				}
				return newDuration
			})
		}, 1000)
		setIntervalId(id)
	}

	const startRestTimer = () => {
		const id = setInterval(() => {
			setRestDuration((prev) => {
				if (prev <= 1) {
					clearInterval(id)
					setIsItRestNow(false)
					return 0
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
		setIsPressed(false)
		setIsPulsing(false)
		stopMeditation()

		if (pressDuration >= 5) {
			const calculatedRestDuration = Math.floor(pressDuration * 1.5)
			const cappedRestDuration = Math.min(calculatedRestDuration, 60)
			setRestDuration(cappedRestDuration)
			setIsItRestNow(true)
			startRestTimer()
			startMeditation()
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
		<main className='bg-white dark:bg-black flex flex-col justify-center items-center py-[10vh] md:py-0 gap-[10vh] h-[100vh]'>
			<RepCount
				setIsSetStarted={setIsSetStarted}
				setIsSetFinished={setIsSetFinished}
				currentCount={currentCount}
				setCount={setCount}
			/>
			<H1>
				{isPressed}

				{/* {isSetStarted
					? isItRestNow
						? `Отдых`
						: breathStage
					: isSetFinished
					? 'Сет завершен!'
					: 'Нажми чтобы начать!'} */}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
				pressDuration={pressDuration}
				isPressed={isPressed}
				isItRestNow={isItRestNow}
				isPulsing={isPulsing}
			/>
			<Countdown restDuration={restDuration} pressDuration={pressDuration}>
				{isItRestNow ? restDuration : pressDuration}
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
