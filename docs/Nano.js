const React = require('react')
const { renderToString } = require('react-dom/server')
const nano = require('nano-style')
const { space, color } = require('styled-system')

const Root = nano('div')({
  fontFamily: 'system-ui, -apple-system, sans-serif',
})

const Hello = nano('h1')(space, color)

Hello.defaultProps = {
  m: 0
}

const Pre = nano('pre')({
  fontFamily: 'Menlo, monospace'
}, space)

Pre.defaultProps = {
  m: 0
}

const Nano = props => (
  <Root>
    <Hello p={3} bg='tomato'>Hello</Hello>
    <Pre p={3}>npm i micro-react</Pre>
  </Root>
)

module.exports = Nano
