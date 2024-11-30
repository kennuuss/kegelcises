import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'
import Warning from '../Components/Warning'

function App() {
	const [currentCount, setCount] = useState(1)
	const [pressDuration, setPressDuration] = useState(0)
	const [restDuration, setRestDuration] = useState(0)
	const [isResting, setIsResting] = useState(false)
	const [isPressed, setIsPressed] = useState(false)
	const [isSetStarted, setIsSetStarted] = useState(false)
	const [isSetFinished, setIsSetFinished] = useState(false)
	const [isWarningShowing, setIsWarningShowing] = useState(false)
	const [breathStage, setBreathStage] = useState('')
	const [restId, setRestId] = useState(null)
	const [timerId, setTimerId] = useState(null)
	const [intervalId, setIntervalId] = useState(null)

	useEffect(() => {
		if (!isResting) {
			stopMeditation()
		}
	}, [isResting])

	const startMeditation = () => {
		let stage = 'Вдох'
		let counter = 0
		setBreathStage('Вдох')

		const id = setInterval(() => {
			counter++
			if (stage === 'Вдох' && counter === 9) {
				setBreathStage('Задержка')
				stage = 'Задержка'
				counter = 0
			} else if (stage === 'Задержка' && counter === 2) {
				setBreathStage('Выдох')
				stage = 'Выдох'
				counter = 0
			} else if (stage === 'Выдох' && counter === 8) {
				setBreathStage('Вдох')
				stage = 'Вдох'
				counter = 0
			}
		}, 1000)

		setTimerId(id)
	}

	useEffect(startMeditation, [currentCount])

	const stopMeditation = () => {
		if (timerId) {
			clearInterval(timerId)
			setTimerId(null)
		}
		setBreathStage(null)
	}

	const startTimer = () => {
		setPressDuration(0)
		const id = setInterval(() => {
			setPressDuration((prev) => {
				const newDuration = prev + 1
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
					setIsResting(false)
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
		/* currentCount === 0 && setCount(1) */
		setIsSetStarted(true)

		setIsPressed(true)
		startTimer()
	}

	const handleMouseUp = () => {
		setIsPressed(false)
		stopMeditation()

		if (pressDuration >= 5) {
			const calculatedRestDuration = Math.floor(pressDuration * 1.5)
			const cappedRestDuration = Math.min(calculatedRestDuration, 60)
			setRestDuration(cappedRestDuration)
			setIsResting(true)
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
		<main className='bg-white dark:bg-black flex flex-col justify-center items-center lg:py-0 py-[12vh] gap-[6vh] h-[100vh]'>
			<RepCount
				setIsSetStarted={setIsSetStarted}
				setIsSetFinished={setIsSetFinished}
				setRestDuration={setRestDuration}
				currentCount={currentCount}
				setCount={setCount}
			/>
			<H1>
				{isPressed
					? pressDuration >= 5
						? breathStage
						: 'Держи!'
					: isResting
					? 'Отдых'
					: isSetStarted
					? 'Нажми когда будешь готов'
					: isSetFinished
					? `Ты закончил сет! Молодец!`
					: 'Зажми что бы начать!'}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
				pressDuration={pressDuration}
				isResting={isResting}
				isSetFinished={isSetFinished}
			/>
			<Countdown restDuration={restDuration} pressDuration={pressDuration}>
				{isResting ? restDuration : pressDuration}
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
