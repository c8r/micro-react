const React = require('react')

const Icon = props => {
  props.res.setHeader('Content-Type', 'image/svg+xml')

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 32 32'
      fill={props.fill}
    >
      <path d="M16 0 C6 0 2 4 2 14 L2 22 L6 24 L6 30 L26 30 L26 24 L30 22 L30 14 C30 4 26 0 16 0 M9 12 A4.5 4.5 0 0 1 9 21 A4.5 4.5 0 0 1 9 12 M23 12 A4.5 4.5 0 0 1 23 21 A4.5 4.5 0 0 1 23 12"/>
    </svg>
  )
}

Icon.defaultProps = {
  fill: 'currentColor'
}

module.exports = Icon
