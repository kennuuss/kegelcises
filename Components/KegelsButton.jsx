import React, { useEffect } from 'react'
import Countdown from './Countdown'
import * as SVG from '../src/SVGs'
import confetti from 'https://cdn.skypack.dev/canvas-confetti'

function KegelsButton(props) {
	// Функция для запуска конфетти
	const launchConfetti = () => {
		const duration = 200 // Длительность анимации
		const animationEndTime = Date.now() + duration

		const interval = setInterval(() => {
			confetti({
				particleCount: 30,
				angle: 90,
				spread: 90,
				origin: { x: 0.5, y: 0.5 }, // Центр кнопки
			})

			if (Date.now() > animationEndTime) {
				clearInterval(interval)
			}
		}, 50)
	}

	// Эффект для отслеживания, когда isSetFinished изменяется
	useEffect(() => {
		if (props.isSetFinished) {
			launchConfetti()
		}
	}, [props.isSetFinished])

	return (
		<div>
			<button
				onMouseDown={props.handleMouseDown}
				onMouseUp={props.handleMouseUp}
				onMouseLeave={props.handleMouseLeave}
				onTouchStart={(e) => {
					e.preventDefault(), props.handleMouseDown()
				}}
				onTouchEnd={(e) => {
					e.preventDefault(), props.handleMouseUp()
				}}
				onTouchCancel={(e) => {
					e.preventDefault(), props.handleMouseLeave()
				}}
				className={`${
					props.isResting && 'relative pointer-events-none cursor-not-allowed '
				} w-[350px] h-[350px] flex hover:scale-105 transition-all duration-150 lg:active:scale-110 justify-center items-center `}
			>
				<span
					className={`transform flex justify-center items-center transition-all duration-150 rounded-full w-[244px] h-[244px] ${
						props.pressDuration > 0
							? 'bg-[#601CE9]'
							: props.isResting
							? 'bg-[#3A1487]'
							: 'bg-[#9B69FF]'
					}`}
				>
					<span
						className={`text-white flex justify-center items-center ${
							!props.isSetFinished && 'hidden'
						}`}
					>
						{SVG.SVGRestart}
					</span>
					<Countdown
						restDuration={props.restDuration}
						pressDuration={props.pressDuration}
					>
						{props.isResting ? props.restDuration : props.pressDuration}
					</Countdown>
				</span>
			</button>
		</div>
	)
}

export default KegelsButton
