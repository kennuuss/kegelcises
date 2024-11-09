import React from 'react'

function PopUpWindow(bg, children) {
	return (
		<div className={('w-[90vw] h-[15vh] rounded-lg', { bg })}>{children}</div>
	)
}

export default PopUpWindow
