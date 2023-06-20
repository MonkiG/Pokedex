import * as React from 'react'
const PokeBallSvg = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#4F4F4F"
      d="M21.901 13h-5.05a5.002 5.002 0 0 1-9.8 0H2c.502 5.053 4.765 9 9.95 9 5.186 0 9.45-3.947 9.951-9ZM21.901 11c-.502-5.053-4.765-9-9.95-9C6.765 2 2.5 5.947 2 11h5.05a5.002 5.002 0 0 1 9.8 0h5.051Z"
    />
    <path
      fill="#4F4F4F"
      fillRule="evenodd"
      d="M11.95 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm1.5-3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
      clipRule="evenodd"
    />
  </svg>
)

export default PokeBallSvg
