import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import Countdown from './../Components/Countdown'
import RepCount from './../Components/RepCount'
import { useEffect, useState } from 'react'

function App() {
	const [currentCount, setCount] = useState(0)
	useEffect(() => console.log(currentCount), [currentCount])

	return (
		<div className='bg-white flex flex-col justify-center align-middle gap-[10%] h-[100vh]'>
			<RepCount></RepCount>
			<H1>Зажми для старта!</H1>
			<KegelsButton
				currentCount={currentCount}
				setCount={setCount} />
			<Countdown> </Countdown>
		</div>
	)
}

export default App
