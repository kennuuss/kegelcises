import React, { useEffect } from 'react'
import H1 from './H1'

function LastRepWarning(props) {
	useEffect(() => {
		if (props.isLastRepWarningShowing) {
			const timer = setTimeout(() => {
				props.setIsLastRepWarningShowing(false)
			}, 3000) // 3000 мс = 3 секунды

			// Очищаем таймер при размонтировании компонента или изменении флага
			return () => clearTimeout(timer)
		}
	}, [props.isLastRepWarningShowing, props.setIsLastRepWarningShowing])

	return (
		<button
			onClick={() => props.setIsLastRepWarningShowing(false)}
			onTouchStart={() => props.setIsLastRepWarningShowing(false)}
			className={`flex justify-center items-center h-[15vh] transition-all duration-150 ease-in-out absolute top-[20px] left-[20px] right-[20px] rounded-3xl bg-[#EDB211] ${
				props.isLastRepWarningShowing
					? ' translate-y-0 '
					: ' translate-y-[-200%] '
			}`}
		>
			<H1 className=' text-white '>Последнее повторение!</H1>
		</button>
	)
}
export default LastRepWarning