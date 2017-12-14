const React = require('react')
const connect = require('refunk')

const inc = s => ({ count: s.count + 1 })

const App = connect(props => (
  <React.Fragment>
    <h1>Hello {props.count}</h1>
    <button
      children='+'
      onClick={e => props.update(inc)}
    />
  </React.Fragment>
))

App.defaultProps = {
  count: 0
}

module.exports = App
