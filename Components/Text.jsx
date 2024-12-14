import React from 'react'

export function P({ className, children }) {
	return <p className={`font-poppins text-[24px] dark:text-white ${className}`}>{children}</p>
}

export function H1(props) {
	return (
		<h1
			className={`font-poppins text-[56px] font-normal select-none  dark:text-white h-min ${
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
			className={`font-poppins text-[36px] text-white font-bold select-none   h-min ${
				props.className
			} ${props.children === 'pass' && ' opacity-0 pointer-events-none '}`}
		>
			{props.children}
		</h2>
	)
}

export default Text
