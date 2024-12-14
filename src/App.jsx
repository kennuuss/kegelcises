import React, { useEffect, useRef, useState } from 'react'
import ButtonContainer from '../Containers/ButtonContainer'
import SetStatsList from '../Components/SetStatsList'

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
	const [breathStage, setBreathStage] = useState('')
	const [restId, setRestId] = useState(null)
	const [timerId, setTimerId] = useState(null)
	const [intervalId, setIntervalId] = useState(null)
	const [currentSet, setCurrentSet] = useState(1)
	const [currentSetId, setCurrentSetId] = useState(null)
	const [whichRef, setWhichRef] = useState(1)

	const [sets, setSets] = useState([
		{
			id: 1,
			setDuration: '0:46',
			reps: [
				{ id: 0, repType: 'Hold', repDuration: '0:12' },
				{ id: 1, repType: 'Rest', repDuration: '0:24' },
				{ id: 2, repType: 'Tap', repDuration: '0' },
				{ id: 3, repType: 'Tap', repDuration: '0' },
				{ id: 4, repType: 'Tap', repDuration: '0' },
				{ id: 5, repType: 'Hold', repDuration: '0' },
				{ id: 6, repType: 'Rest', repDuration: '0' },
				{ id: 7, repType: 'Hold', repDuration: '0' },
				{ id: 8, repType: 'Rest', repDuration: '0' },
				{ id: 9, repType: 'Tap', repDuration: '0' },
				{ id: 10, repType: 'Tap', repDuration: '0' },
				{ id: 11, repType: 'Tap', repDuration: '0' },
				{ id: 12, repType: 'Hold', repDuration: '0' },
				{ id: 13, repType: 'Rest', repDuration: '0' },
				{ id: 14, repType: 'Rest', repDuration: '0' },
			],
		},
	])

	useEffect(() => {
		const startSetTimer = () => {
			setCurrentSetId(0)
			const id = setInterval(() => {
				setCurrentSetId((prev) => prev + 1)
			}, 1000)
			setIntervalId(id)
		}
	}, [isSetStarted, !isSetFinished])

	useEffect(() => {
		setCurrentSetId(currentSetId)
	}, [isSetFinished])

	const eraceCount = () => {
		setCount(1)
		setRestDuration(0)
		setIsSetStarted(true)
		setIsSetFinished(false)

		/* if (restId) {
			clearInterval(restId)
			setRestId(null)
			setRestDuration(0)
		} */
	}

	//!мышь
	const handleMouseDown = () => {
		isSetFinished
			? eraceCount()
			: (setIsSetStarted(true), setIsPressed(true), startTimer())
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

	//!медитация

	useEffect(() => {
		if (!isResting) {
			stopMeditation()
		}
	}, [isResting])

	const startMeditation = () => {
		let stage = 'Inhale'
		let counter = 0
		setBreathStage('Inhale')

		const id = setInterval(() => {
			if (pressDuration >= 5) {
				counter++
				if (stage === 'Inhale' && counter === 4) {
					setBreathStage('Hold your breath')
					stage = 'Hold your breath'
					counter = 0
				} else if (stage === 'Hold your breath' && counter === 2) {
					setBreathStage('Exhale')
					stage = 'Exhale'
					counter = 0
				} else if (stage === 'Exhale' && counter === 8) {
					setBreathStage('Inhale')
					stage = 'Inhale'
					counter = 0
				}
			}
		}, 1000)

		setTimerId(id)
	}

	useEffect(() => {
		if (pressDuration >= 5 && !timerId) {
			startMeditation()
		}
	}, [pressDuration])

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

	function formatTime(seconds) {
		// Проверка, чтобы секунды были неотрицательными
		if (seconds < 0) return '0:00'

		// Вычисление минут и оставшихся секунд
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60

		// Форматирование, чтобы секунды всегда были двухзначными
		const formattedSeconds =
			remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

		// Возвращение в формате минуты:секунды
		return `${minutes}:${formattedSeconds}`
	}

	const stopTimer = () => {
		clearInterval(intervalId)
		setIsPressed(false)
		setPressDuration(0)

		// Проверка на завершение текущего подхода
		if (currentCount <= 14) {
			setCount((prev) => prev + 1)
		}

		if (currentCount === 14) {
			setIsSetFinished(true)
			setCurrentSet((prev) => prev + 1)

			// Создание нового сета
			const newSet = {
				id: currentSet,
				setDuration: formatTime(currentSetId || 0),
				reps: [],
			}

			setSets((prevSets) => [...prevSets, newSet])
			setIsSetStarted(false)
		}

		// Проверка существования текущего сета
		setSets((prevSets) => {
			const updatedSets = [...prevSets]
			const currentSetIndex = currentSet - 1

			if (updatedSets[currentSetIndex]) {
				const newRepInfo = {
					id: updatedSets[currentSetIndex].reps.length + 1,
					repType: isResting ? 'Rest' : pressDuration >= 5 ? 'Hold' : 'Tap',
					repDuration: isResting
						? formatTime(restDuration)
						: pressDuration >= 5
						? formatTime(pressDuration)
						: '',
				}

				updatedSets[currentSetIndex].reps = [
					...updatedSets[currentSetIndex].reps,
					newRepInfo,
				]
			}

			return updatedSets
		})

		if (currentCount === 13) {
			setIsWarningShowing(true)
		}
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
			clearInterval(restId)
		}
	}, [intervalId, restId])

	return (
		<main className='bg-white overflow-hidden dark:bg-[#0D0126] flex flex-col justify-center items-center  gap-4 min-h-[100vh]'>
			<ButtonContainer
				currentCount={currentCount}
				setCount={setCount}
				pressDuration={pressDuration}
				restDuration={restDuration}
				setRestDuration={setRestDuration}
				isResting={isResting}
				isPressed={isPressed}
				isSetStarted={isSetStarted}
				setIsSetStarted={setIsSetStarted}
				isSetFinished={isSetFinished}
				setIsSetFinished={setIsSetFinished}
				isWarningShowing={isWarningShowing}
				setIsWarningShowing={setIsWarningShowing}
				breathStage={breathStage}
				eraceCount={eraceCount}
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
			/>
			<SetStatsList sets={sets} currentSet={currentSet} />
		</main>
	)
}

export default App
