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
    --port, -p    Server port
    --raw, -r     Serve raw output with no doctype declaration

`, {
  flags: {
    port: {
      type: 'string',
      alias: 'p'
    },
    raw: {
      type: 'boolean',
      alias: 'r'
    }
  }
})

const [ file ] = cli.input
const input = path.join(process.cwd(), file)
const opts = Object.assign({}, cli.flags, {
  port: parseInt(cli.flags.port || 3000)
})

start(input, opts)
  .then(server => {
    const { port } = server.address()
    console.log(`listening on port ${port}`)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
