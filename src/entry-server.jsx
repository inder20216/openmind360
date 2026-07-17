import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export function render() {
  return ReactDOMServer.renderToString(
    <StaticRouter location="/">
      <App />
    </StaticRouter>,
  )
}
