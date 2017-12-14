require('babel-register')({
  presets: [
    'babel-preset-react'
  ].map(require.resolve)
})

const http = require('http')
const url = require('url')
const React = require('react')
const { renderToNodeStream } = require('react-dom/server')

const start = async (input, opts) => {
  opts.port = opts.port || 3000
  const App = require(input)
  const server = http.createServer(handleRequest(App, opts))
  return await server.listen(opts.port)
}

const handleRequest = (App, opts) => async (req, res) => {
  if (!opts.raw) res.write(header)
  const props = Object.assign({}, opts, { req })
  const el = isAsync(App)
    ? await createAsyncElement(App, props)
    : React.createElement(App, props)
  const stream = renderToNodeStream(el)
  stream.pipe(res)
}

const isAsync = fn => fn.constructor.name === 'AsyncFunction'

const createAsyncElement = async (Component, props) =>
  await Component(props)

const header = `<!DOCTYPE html>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>`

module.exports = start
