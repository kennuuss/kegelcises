import React, { useEffect } from 'react'
import H1 from './H1'

function Warning(props) {
	useEffect(() => {
		if (props.isWarningShowing) {
			const timer = setTimeout(() => {
				props.setIsWarningShowing(false)
			}, 3000)
			return () => clearTimeout(timer)
		}
	}, [props.isWarningShowing, props.setIsWarningShowing])

	useEffect(() => {
		props.currentCount === 1 && props.setIsWarningShowing(false)
	}, [props.currentCount])

	const handleTouchStart = (e) => {
		e.preventDefault()
		props.setIsWarningShowing(false)
	}

	return (
		<button
			onClick={() => props.setIsWarningShowing(false)}
			onTouchStart={(e) => handleTouchStart}
			className={`flex justify-center items-center
				lg:w-[40vw] lg:mx-auto h-[15vh] py-8 rounded-3xl
				transition-all duration-500 ease-in-out 
				absolute top-[20px] left-[20px] right-[20px]  
        ${props.isWarningShowing ? ' translate-y-0 ' : ' translate-y-[-200%] '} 
        ${
					props.message === 'Сет завершен!'
						? ' bg-[#74BA89] '
						: ' bg-[#E0C477] '
				} `}
		>
			<H1 className=' text-white '>{props.message}</H1>
		</button>
	)
}

export default Warning
