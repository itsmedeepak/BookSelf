import React from 'react'

export default function BookReadIcon({ dimensions, color }) {
	return (
		<svg
			fill={color || 'currentColor'}
			className={dimensions}
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'>
			<path d='M2,20V4.963a11,11,0,0,1,9,0V20A11,11,0,0,0,2,20ZM13,4.963V20a11,11,0,0,1,9,0V4.963A11,11,0,0,0,13,4.963Z' />
		</svg>
	)
}
