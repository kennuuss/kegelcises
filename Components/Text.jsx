import React from 'react'

export function P({ props, children }) {
	return <p className={`text-[24px] ${className}`}>{children}</p>
}

//! Стадия медитации 
function H1(props) {
	return (
		<h1
			className={`text-[36px] text-center dark:text-white h-min ${
				props.className
			} ${props.children === 'pass' && ' opacity-0 pointer-events-none '}`}
		>
			{props.children}
		</h1>
	)
}

//! Какой это сет по счету (в подсчете итогов), предупреждение в конце сета 
export function H2({ className, children }) {
	return <p className={`text-[24px] text-white ${className}`}>{children}</p>
}

//! Длительность подхода,  

/* function H3(props) {
	return (
		<h3
			className={
				pressDuration > 0 || restDuration >= 1
					? 'text-[58px] mx-auto select-non dark:text-white pointer-events-none'
					: 'opacity-0 text-[58px] mx-auto select-none pointer-events-none'
			}
		>
			{children}
		</h3>
	)
}
 */
export default Text
