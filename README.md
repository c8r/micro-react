
# micro-react

Create microservice apps with React components

```sh
npm i micro-react
```

## Usage

Create a server-side compatible React component

```jsx
// App.js
const React = require('react')

const App = props => (
  <h1>Hello</h1>
)

module.exports = App
```

Add a start script to `package.json`

```json
"scripts": {
  "start": "micro-react App.js"
}
```

Start the server with `npm start`

## Request Object

The Node.js http request object is passed as `props.req`

```jsx
const React = require('react')

const App = props => (
  <h1>Hello {props.req.url}</h1>
)

module.exports = App
```

## Async Components

Use async functions to fetch data and handle other asynchronous tasks before rendering.

```jsx
const React = require('react')
const fetch = require('node-fetch')

const App = async props => {
  const res = await fetch('http://example.com/data')
  const data = await res.json()

  return (
    <h1>Hello {data}</h1>
  )
}

module.exports = App
```

## Client-side JS

By default micro-react only serves static HTML.
Pass the `--bundle` flag to create a browser-compatible bundle on start,
that will be sent in the request after the React Node stream has finished.

```sh
micro-react App.js --bundle
```

See the [examples](docs) for more.

[MIT License](LICENSE.md)
