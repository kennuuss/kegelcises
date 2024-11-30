import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'
import Warning from '../Components/Warning'

function App() {
	//!хуки
	const [currentCount, setCount] = useState(1)
	const [pressDuration, setPressDuration] = useState(0)
	const [restDuration, setRestDuration] = useState(0)
	const [isResting, setIsResting] = useState(false)
	const [isPressed, setIsPressed] = useState(false)
	const [isSetStarted, setIsSetStarted] = useState(false)
	const [isSetFinished, setIsSetFinished] = useState(false)
	const [isWarningShowing, setIsWarningShowing] = useState(false)
	const [breathStage, setBreathStage] = useState('') // начальная фаза дыхания
	const [restId, setRestId] = useState(null)
	const [timerId, setTimerId] = useState(null)
	const [intervalId, setIntervalId] = useState(null)
	const [warnings, setWarnings] = useState([]) // Массив для предупреждений

	const addWarning = (message) => {
		setWarnings((prevWarnings) => [
			...prevWarnings,
			{ message, id: Date.now() }, // ID для уникальности каждого предупреждения
		])
	}


	useEffect(() => {
		if (!isResting) {
			stopMeditation()
		}
	}, [isResting])

	//!мышь
	const handleMouseDown = () => {
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
			startMeditation() // Начать медитацию после 5 секунд
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

	//!медитация
	const startMeditation = () => {
		let stage = 'Вдох' // Начинаем всегда с "Вдох"
		let counter = 0
		setBreathStage('Вдох')

		// Задержка начала отсчета (пока не прошло 5 секунд)
		const id = setInterval(() => {
			if (pressDuration >= 5) { // Проверяем, что прошло 5 секунд
				counter++
				if (stage === 'Вдох' && counter === 4) {
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
			}
		}, 1000)

		setTimerId(id)
	}

	useEffect(() => {
		// Убедитесь, что медитация начинается только после 5 секунд
		if (pressDuration >= 5 && !timerId) {
			startMeditation()
		}
	}, [pressDuration]) // Используем pressDuration для старта медитации

	const stopMeditation = () => {
		if (timerId) {
			clearInterval(timerId)
			setTimerId(null)
		}
		setBreathStage(null)
	}

	//!таймер
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

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
			clearInterval(restId)
		}
	}, [intervalId, restId])

	return (
		<main className='bg-white overflow-hidden dark:bg-black flex flex-col justify-center items-center lg:py-0 py-[12vh] gap-[6vh] h-[100vh]'>
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
						: ''
					: isResting
					? 'Отдых'
					: isSetStarted
					? ''
					: isSetFinished
					? `Молодец!`
					: ''}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseLeave={handleMouseLeave}
				handleMouseUp={handleMouseUp}
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
