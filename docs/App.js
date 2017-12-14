const React = require('react')

const App = props => {
  return (
    <React.Fragment>
      <title>Hello micro-react</title>
      <h1>Hello</h1>
      <pre>npm i micro-react</pre>
      <pre>{props.req.url}</pre>
    </React.Fragment>
  )
}

module.exports = App
