import H1 from '../Components/H1'
import KegelsButton from './../Components/KegelsButton'
import Countdown from './../Components/Countdown'
import RepCount from './../Components/RepCount';

function App() {

	return (
		<div className='bg-white flex flex-col justify-center align-middle gap-[10%] h-[100vh]'>
			<RepCount></RepCount>
			<H1>Зажми для старта!</H1>
			<KegelsButton />
			<Countdown> </Countdown>
		</div>
	)
}

export default App
