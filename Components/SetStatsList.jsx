import React from 'react'
import SetStatsPage from '../Containers/SetStatsPage'

function SetStatsList({ sets, currentSet }) {
	return (
		<>
			{sets[currentSet - 1]?.reps.length === 15 &&
				sets.map((set) => (
					<SetStatsPage ref={set.ref} set={set} key={set.id} />
				))}
		</>
	)
}

export default SetStatsList