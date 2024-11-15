import React, { useEffect, useState } from 'react'
import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import RepCount from './../Components/RepCount'
import Countdown from './../Components/Countdown'

function App() {
	const [currentCount, setCount] = useState(1) // текущее количество
	const [isPressed, setIsPressed] = useState(false) // состояние зажатия кнопки
	const [pressDuration, setPressDuration] = useState(0) // продолжительность зажатия
	const [intervalId, setIntervalId] = useState(null) // ID таймера для остановки

	const startTimer = () => {
		setPressDuration(0)
		const id = setInterval(() => {
			setPressDuration((prev) => prev + 1)
		}, 1000) // обновляем каждую секунду
		setIntervalId(id)
	}

	const stopTimer = () => {
		clearInterval(intervalId)
		setIsPressed(false)
		setCount((prev) => prev + 1) 
	}

	// Обработчики событий для мыши
	const handleMouseDown = () => {
		setIsPressed(true)
		startTimer()
	}

	const handleMouseUp = () => {
		if (isPressed) {
			stopTimer()
		}
		setPressDuration(0)
	}

	const handleMouseLeave = () => {
		if (isPressed) {
			stopTimer()
		}
	}

	useEffect(() => {
		return () => {
			clearInterval(intervalId) // очищаем таймер при размонтировании компонента
		}
	}, [intervalId])

	return (
		<div className='bg-white flex flex-col justify-center items-center gap-[10%] h-[100vh]'>
			{/* Передаем currentCount в компонент RepCount */}
			<RepCount>{currentCount}</RepCount>
			<H1>Зажми для старта!</H1>
			{/* Передаем обработчики в KegelsButton */}
			<KegelsButton
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseLeave={handleMouseLeave}
			/>
			<Countdown> {pressDuration}</Countdown>
		</div>
	)
}

export default App
