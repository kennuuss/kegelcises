import React from 'react'

function H1({children}) {
	return <h1 className={`text-[36px] text-center dark:text-white h-min ${children==='pass' && ' opacity-0 pointer-events-none '}`}>{children}</h1>
}

export default H1