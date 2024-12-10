import React from 'react'

function H1(props) {
	return <h1 className={`text-[36px] select-none text-center dark:text-white h-min ${props.className} ${props.children==='pass' && ' opacity-0 pointer-events-none '}`}>{props.children}</h1>
}

export default H1