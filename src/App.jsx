import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import { H2 } from '../Components/Text'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Warning from '../Components/Warning'
import SetStatsPage from '../Containers/SetStatsPage'
import ButtonContainer from '../Containers/ButtonContainer'



function App() {
	//!хуки
	const [currentCount, setCount] = useState(/* 1 */ 14)
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

	/* 	const sets = [[const setDuration = '', allReps=[]]]
	 */

	/* const [sets, setSets] = useState({
		id: 0,
		setDuration: 0,
		reps: [{ id: 0, repType: null, repDuration: 0 }],
	}) */

	const sets = [
		{
			id: 0,
			setDuration: 0,
			reps: [{ id: 0, repType: null, repDuration: 0 }],
		},
	]

	useEffect(() => {}, [isSetStarted])

	const eraceCount = () => {
		setCount(1)
		setRestDuration(0)
		setIsSetStarted(true)
		setIsSetFinished(false)
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
		<main className='bg-white overflow-hidden dark:bg-black flex flex-col justify-center items-center lg:py-8 py-[12vh] gap-4 min-h-[100vh]'>
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
			{sets.length > 0 && <SetStatsPage sets={sets} />}
		</main>
	)
}

export default App
