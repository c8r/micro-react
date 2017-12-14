const React = require('react')
const { renderToString } = require('react-dom/server')
const styled = require('styled-components')
const { space, color } = require('styled-system')

styled.injectGlobal([], {
  '*': {
    boxSizing: 'border-box'
  },
  body: {
    fontFamily: 'system-ui, -apple-system, sans-serif',
    margin: 0
  }
})

const Hello = styled.default.h1([], space, color)

Hello.defaultProps = {
  m: 0
}

const Pre = styled.default.pre([], {
  fontFamily: 'Menlo, monospace'
}, space)

Pre.defaultProps = {
  m: 0
}

const App = props => (
  <React.Fragment>
    <Hello p={3} bg='tomato'>Hello</Hello>
    <Pre p={3}>npm i micro-react</Pre>
  </React.Fragment>
)

const StyledComponents = props => {
  const sheet = new styled.ServerStyleSheet()
  renderToString(
    sheet.collectStyles(
      <App {...props} />
    )
  )
  const styleElement = sheet.getStyleElement()

  return (
    <React.Fragment>
      {styleElement}
      <App {...props} />
    </React.Fragment>
  )
}

module.exports = StyledComponents
