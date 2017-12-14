const React = require('react')
const fetch = require('node-fetch')

const endpoint = `https://microbeats.now.sh/tracks`

const ASync = async props => {
  const res = await fetch(endpoint)
  const data = await res.json()

  return (
    <React.Fragment>
      <title>Hello micro-react</title>
      <h1>Hello</h1>
      <pre>npm i micro-react</pre>
      <pre>{props.req.url}</pre>
      <pre children={JSON.stringify(data, null, 2)} />
    </React.Fragment>
  )
}

module.exports = ASync
