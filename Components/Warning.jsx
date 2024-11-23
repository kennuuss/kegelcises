import React, { useEffect } from 'react'
import H1 from './H1'

function Warning({
	isWarningShowing,
	setIsWarningShowing,
	message,
	currentCount,
}) {
	useEffect(() => {
		if (isWarningShowing) {
			const timer = setTimeout(() => {
				setIsWarningShowing(false) // Скрыть предупреждение через 3 секунды
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [isWarningShowing, setIsWarningShowing])

	const handleTouchStart = (e) => {
		e.preventDefault()
		setIsWarningShowing(false)
	}

	return (
		<button
			onClick={() => setIsWarningShowing(false)}
			onTouchStart={handleTouchStart}
			className={`flex justify-center items-center h-[15vh] transition-all duration-500 ease-in-out absolute top-[20px] left-[20px] right-[20px] rounded-3xl 
        ${isWarningShowing ? ' translate-y-0 ' : ' translate-y-[-200%] '} 
        ${message === 'Сет завершен!' ? ' bg-[#74BA89] ' : ' bg-[#E0C477] '} `}
		>
			<H1 className='text-white'>{message}</H1>
		</button>
	)
}

export default Warning
