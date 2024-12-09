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
	const [breathStage, setBreathStage] = useState('')
	const [restId, setRestId] = useState(null)
	const [timerId, setTimerId] = useState(null)
	const [intervalId, setIntervalId] = useState(null)
	/* const [warnings, setWarnings] = useState([])

	const addWarning = (message) => {
		setWarnings((prevWarnings) => [
			...prevWarnings,
			{ message, id: Date.now() },
		])
	} */

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
					setBreathStage('Hold')
					stage = 'Hold'
					counter = 0
				} else if (stage === 'Hold' && counter === 2) {
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
		<main className='bg-white overflow-hidden dark:bg-black flex flex-col justify-center items-center lg:py-8 py-[12vh] gap-4 h-[100vh]'>
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
						: 'pass'
					: isResting
					? 'Rest'
					: isSetStarted
					? 'pass'
					: isSetFinished
					? 'pass' /* `Nice job!` */
					: 'Tap to start! '}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseLeave={handleMouseLeave}
				handleMouseUp={handleMouseUp}
				pressDuration={pressDuration}
				restDuration={restDuration}
				isResting={isResting}
				isSetFinished={isSetFinished}
				currentCount={currentCount}
			/>
			<Warning
				currentCount={currentCount}
				isWarningShowing={isWarningShowing}
				setIsWarningShowing={setIsWarningShowing}
			/>
			{/* {currentCount === 14 && (
				<Warning
					currentCount={currentCount}
					isWarningShowing={isWarningShowing}
					setIsWarningShowing={setIsWarningShowing}
					message='Last rep!'
				/>
			)}
			{currentCount === 15 && (
				<Warning
					currentCount={currentCount}
					isWarningShowing={isWarningShowing}
					setIsWarningShowing={setIsWarningShowing}
					message='Set is over!'
				/>
			)} */}
		</main>
	)
}

export default App
