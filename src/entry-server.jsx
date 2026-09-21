import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export function render(location = '/') {
  return ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <App />
    </StaticRouter>,
  )
}
