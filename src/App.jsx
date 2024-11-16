import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'

function App() {
	const [currentCount, setCount] = useState(1)
	const [isPressed, setIsPressed] = useState(false)
	const [pressDuration, setPressDuration] = useState(0)
	const [intervalId, setIntervalId] = useState(null)
	const [isItRestNow, setIsItRestNow] = useState(false)
	const [restDuration, setRestDuration] = useState(0)

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

		/* setIsItRestNow(true) */
		setRestDuration(pressDuration)
		setPressDuration(0)

		if (currentCount <= 14) {
			setCount((prev) => prev + 1)
		}

		/* const restId = setInterval(() => {
			setPressDuration((prev) => prev - 1)
		}, 1000)
		setRestDuration(restId) */

	}

	const handleMouseDown = () => {
		setIsPressed(true)
		startTimer()
	}

	const handleMouseUp = () => {
		if (isPressed) {
			stopTimer()
		}
	}

	const handleMouseLeave = () => {
		handleMouseUp()
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId)
		}
	}, [intervalId])

	return (
		<div className='bg-white flex flex-col justify-center items-center gap-[10%] h-[100vh]'>
			<RepCount currentCount={currentCount} setCount={setCount}>
				{currentCount}
			</RepCount>
			<H1>
				{isPressed
					? 'Вдох!'
					: isItRestNow
					? `Отдых ${restDuration} сек.`
					: 'Нажми чтобы начать!'}
			</H1>
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
				pressDuration={pressDuration}
				isPressed={isPressed}
			/>
			<Countdown pressDuration={pressDuration}>{pressDuration}</Countdown>
		</div>
	)
}

export default App
