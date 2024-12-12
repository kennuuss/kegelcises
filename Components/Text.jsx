import React from 'react'

export function P({ className, children }) {
	return <p className={`text-[24px] dark:text-white ${className}`}>{children}</p>
}

export function H1(props) {
	return (
		<h1
			className={`text-[56px] font-bold select-none text-center dark:text-white h-min ${
				props.className
			} ${props.children === 'pass' && ' opacity-0 pointer-events-none '}`}
		>
			{props.children}
		</h1>
	)
}

export function H2(props) {
	return (
		<h2
			className={`text-[36px] text-white font-bold select-none text-center  h-min ${
				props.className
			} ${props.children === 'pass' && ' opacity-0 pointer-events-none '}`}
		>
			{props.children}
		</h2>
	)
}

export default Text
