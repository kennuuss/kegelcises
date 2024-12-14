import React, { useState } from 'react'
import { H1, H2, P } from '../Components/Text'
import * as SVG from '../src/SVGs'

function SetStatsPage({ set }) {
	const [isDetailsShowing, setIsDetailsShowing] = useState(false)

	// Функция фильтрации повторений по типу
	const filterRepsByType = (reps, type) =>
		reps.filter((rep) => rep.repType === type)

	// Фильтрация по типам
	const tapReps = filterRepsByType(set.reps, 'tap')
	const holdReps = filterRepsByType(set.reps, 'hold')
	const restReps = filterRepsByType(set.reps, 'rest')

	// Создание массива данных для отображения
	const setStatsPoints = [
		{ title: 'Duration of set', stat: set.setDuration, color: '000000' },
		{ title: 'Tap reps', stat: tapReps.length, color: '9B69FF' },
		{ title: 'Hold reps', stat: holdReps.length, color: 'F4C43F' },
		{ title: 'Rest reps', stat: restReps.length, color: '74BA89' },
	]

	return (
		<div
			ref={set.ref}
			className='min-h-screen flex flex-col items-center justify-center my-32 gap-16'
		>
			<H1>{set.id} set</H1>
			<div className='flex lg:gap-[82px] lg:flex-row flex-col items-center'>
				{/* стата */}
				<div className='flex-col lg:w-[30vw] hidden lg:flex gap-[48px]'>
					{setStatsPoints.map((point, index) => (
						<div
							key={index}
							className='flex flex-col lg:hover:opacity-65 lg:transition-all lg:duration-200'
						>
							<H2
								className={`text-right font-black`}
							>
								{point.title}
							</H2>
							<H1
								className={`text-right font-thin`}
							>
								{point.stat}
							</H1>
						</div>
					))}
				</div>
				{/* /стата */}
				{/* список повторений */}
				<ul className='flex gap-[12px] flex-col lg:w-[30vw]'>
					{set.reps.map((rep, index) => (
						<li
							key={index}
							className='flex gap-[35px] items-center lg:hover:translate-y-[-3px] lg:active:translate-y-[-5px] lg:transition-all lg:duration-100 cursor-pointer'
						>
							<span
								className={`min-w-[32px] select-none min-h-[32px] rounded-[6px] bg-[${
									rep.repType === 'Tap'
										? '#9B69FF'
										: rep.repType === 'Rest'
										? '#3A1487'
										: rep.repType === 'Hold' && '#601CE9'
								}]`}
							/>
							<P className={' min-w-[55px] text-center select-none '}>
								{rep.repType}
							</P>
							<span>{SVG.SVGRepLine}</span>
							<P
								className={
									' text-center select-none justify-center flex w-[40px] '
								}
							>
								{rep.repType === 'Tap' ? SVG.SVGTapEllipse : rep.repDuration}
							</P>
						</li>
					))}
				</ul>
				{/* /список повторений */}
			</div>
			<button onClick={() => setIsDetailsShowing(!isDetailsShowing)} className='w-full block lg:hidden py-4 bg-[#601CE9] bg-opacity-50 rounded-3xl'>
				<P>more</P>
			</button>
			<div className={`w-full flex flex-col ${isDetailsShowing ? ' flex ' : ' hidden '}`}>
				{/* стата для телефонов */}
				<div className={`flex-col lg:w-[30vw] gap-[48px]`}>
					{setStatsPoints.map((point, index) => (
						<div
							key={index}
							className='flex flex-col lg:hover:opacity-65 lg:transition-all lg:duration-200'
						>
							<H2
								className={`text-left font-black`}
							>
								{point.title}
							</H2>
							<H1
								className={`text-left font-thin`}
							>
								{point.stat}
							</H1>
						</div>
					))}
				</div>
				{/* /стата для телефонов */}
			</div>
		</div>
	)
}

export default SetStatsPage
