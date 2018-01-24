#!/usr/bin/env node
const path = require('path')
const meow = require('meow')

const start = require('./index')

require('update-notifier')({
  pkg: require('./package.json')
}).notify()

const cli = meow(`
  Usage
    $ micro-react <component>

  Options
    --port, -p     Server port
    --raw, -r      Serve raw output with no doctype declaration
    --bundle, -b   Render with bundled javascript
    --noWrap, -n   Opt out of wrapping component in a div
`, {
  flags: {
    port: {
      type: 'string',
      alias: 'p'
    },
    raw: {
      type: 'boolean',
      alias: 'r'
    },
    bundle: {
      type: 'boolean',
      alias: 'b'
    },
    noWrap: {
      type: 'boolean',
      default: false,
      alias: 'n'
    }
  }
})

const [ file ] = cli.input
const filename = path.join(process.cwd(), file)
const opts = Object.assign({}, cli.flags, {
  filename,
  port: parseInt(cli.flags.port || 3000)
})

start(opts)
  .then(server => {
    if (!server.address()) {
      console.log(`failed to start server on ${cli.flags.port || 3000}`)
      process.exit(1)
    }

    const { port } = server.address()
    console.log(`listening on port ${port}`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
