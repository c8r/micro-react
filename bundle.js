const fs = require('fs')
const path = require('path')
const { Readable } = require('stream')
const babel = require('babel-core')
const browserify = require('browserify')

const parse = (filename, raw) => babel.transform(raw, {
  filename,
  presets: [
    require('babel-preset-env'),
    require('babel-preset-stage-0'),
    require('babel-preset-react'),
  ],
  compact: true,
  minified: true,
  comments: false,
}).code

const browser = (filename, code) => {
  const stream = new Readable
  stream.push(code)
  stream.push(null)
  const dirname = path.dirname(filename)

  return new Promise((resolve, reject) => {
    browserify(stream, {
      basedir: dirname
    })
      .bundle((err, res) => {
        if (err) reject(err)
        else {
          const script = res.toString()
          resolve(script)
        }
      })
  })
}

const bundle = async filename => {
  const raw = fs.readFileSync(filename)
  const component = parse(filename, raw)
  const entry = createEntry(component)
  const script = await browser(filename, entry)
  return script
}

// current doesn't handle async components
const createEntry = component => (`
${component}
const { hydrate } = require('react-dom')

const props = JSON.parse(
  initial_props.innerHTML
)
const el = React.createElement(App, props)
hydrate(el, div)
`)

module.exports = bundle
