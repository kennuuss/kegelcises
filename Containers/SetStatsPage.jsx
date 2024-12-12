import React from 'react'
import { H1, H2, P } from '../Components/Text'
import * as SVG from '../src/SVGs'

function SetStatsPage({ set }) {
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
		<div className='h-screen w-screen flex flex-col items-center '>
			<H1>{set.id} set</H1>
			<div className='flex lg:gap-[82px] items-center'>
				<div className='flex flex-col lg:w-[30vw]'>
					{setStatsPoints.map((point, index) => (
						<div key={index} className='flex flex-col'>
							<H2
								className={`text-right font-black dark:text-[#${point.color}] `}
							>
								{point.title}
							</H2>
							<H1
								className={`text-right font-normal dark:text-[#${point.color}] `}
							>
								{point.stat}
							</H1>
						</div>
					))}
				</div>
				<ul className='flex gap-[12px] flex-col lg:w-[30vw]'>
					{set.reps.map((rep, index) => (
						<li key={index} className='flex gap-[35px] items-center'>
							<span
								className={`min-w-[32px] min-h-[32px] rounded-[6px] bg-[${
									rep.repType === 'Tap'
										? '#9B69FF'
										: rep.repType === 'Rest'
										? '#74BA89'
										: rep.repType === 'Hold'
										&& '#F4C43F'
								}]`}
							/>
							<P className={' min-w-[55px] text-center '}>{rep.repType}</P>
							<span>{SVG.SVGRepLine}</span>
							<P className={' text-center justify-center flex min-w-[30px] '}>
								{rep.repType === 'Tap' ? SVG.SVGTapEllipse : rep.repDuration}
							</P>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}

export default SetStatsPage
