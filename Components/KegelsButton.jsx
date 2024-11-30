import React, { useEffect, useRef } from 'react'

function KegelsButton(props) {
	const buttonRef = useRef(null)

	const handleTouch = (e, func) => {
		e.preventDefault() // Блокирует системное поведение
		func() // Вызывает переданную функцию
	}

	useEffect(() => {
		const button = buttonRef.current

		// Добавляем события с passive: false
		const handleTouchStart = (e) => handleTouch(e, props.handleMouseDown)
		const handleTouchEnd = (e) => handleTouch(e, props.handleMouseUp)
		const handleTouchCancel = (e) => handleTouch(e, props.handleMouseLeave)

		button.addEventListener('touchstart', handleTouchStart, { passive: false })
		button.addEventListener('touchend', handleTouchEnd, { passive: false })
		button.addEventListener('touchcancel', handleTouchCancel, {
			passive: false,
		})

		// Убираем события при размонтировании компонента
		return () => {
			button.removeEventListener('touchstart', handleTouchStart)
			button.removeEventListener('touchend', handleTouchEnd)
			button.removeEventListener('touchcancel', handleTouchCancel)
		}
	}, [props])

	/* const handleTouch = (e, func) => {
		e.preventDefault()
		func()
	} */

	/* const handleTouchStart = (e) => {
		e.preventDefault()
		handleMouseDown()
	}

	const handleTouchEnd = (e) => {
		e.preventDefault()
		handleMouseUp()
	}

	const handleTouchCancel = (e) => {
		e.preventDefault()
		handleMouseLeave()
	} */

		return (
			<button
				ref={buttonRef} // Используем ref для доступа к DOM элементу
				onMouseDown={props.handleMouseDown}
				onMouseUp={props.handleMouseUp}
				onMouseLeave={props.handleMouseLeave}
				className={`w-[350px] h-[350px] flex hover:scale-105 transition-all duration-150 lg:active:scale-110 justify-center items-center 
					${props.isResting || props.isSetFinished ? ' pointer-events-none cursor-not-allowed ' : ''}`}
			>
				<div
					className={`transform transition-all duration-150 rounded-full w-[244px] h-[244px] ${
						props.isResting
							? ' dark:bg-[#180048] bg-[#4E1CB4] '
							: ' bg-[#9B69FF] dark:bg-[#4C0AD0] '
					}
						scale-[${props.pressDuration === 0
							? ' scale-[1] '
							: props.pressDuration === 1
							? ' scale-[0.90] '
							: props.pressDuration === 2
							? ' scale-[0.80] '
							: props.pressDuration === 3
							? ' scale-[0.70] '
							: ' scale-[0.70] '}]`}
				/>
			</button>
		);
	}
	
	export default KegelsButton;