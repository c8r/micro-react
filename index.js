require('babel-register')({
  presets: [
    'babel-preset-react'
  ].map(require.resolve)
})

const http = require('http')
const url = require('url')
const React = require('react')
const { renderToNodeStream } = require('react-dom/server')
const jsonStringify = require('json-stringify-safe')

const bundle = require('./bundle')

const start = async (opts) => {
  opts.port = opts.port || 3000
  if (opts.bundle) {
    opts.script = await bundle(opts.filename)
    console.log('bundle size: ' + opts.script.length + ' bytes')
  }
  const App = require(opts.filename)
  const server = http.createServer(handleRequest(App, opts))
  return await server.listen(opts.port)
}

const handleRequest = (App, opts) => async (req, res) => {
  if (!opts.raw) res.write(header)
  res.write('<div id=div>')
  const props = Object.assign({}, opts, { req })

  delete props.script

  const el = isAsync(App)
    ? await createAsyncElement(App, props)
    : React.createElement(App, props)
  const stream = renderToNodeStream(el)
  stream.pipe(res, { end: false })

  stream.on('end', async () => {
    res.write('</div>')
    if (opts.script) {
      const json = jsonStringify(props)
      res.write(`<script id='initial_props' type='application/json'>${json}</script>`)
      res.write(`<script>${opts.script}</script>`)
    }

    res.end()
  })
}

const isAsync = fn => fn.constructor.name === 'AsyncFunction'

const createAsyncElement = async (Component, props) =>
  await Component(props)

const header = `<!DOCTYPE html>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width,initial-scale=1'>`

module.exports = start
