import React from 'react'
import * as SVG from '../src/SVGs'

function ScrollBtn(props) {
  return (
    <button className={`${props.className} p-5 lg:hover:translate-y-1 lg:active:translate-y-2 transition-all duration-100`}>{SVG.SVGArrowDown}</button>
  )
}

export default ScrollBtn