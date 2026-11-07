import DataComponent from './DataComponent'
import ErrorComponent from './ErrorComponent'
import LoadingComponent from './LoadingComponent'
import './use-json-fetch.css'

function UseJsonFetchApp() {
  return (
    <div className="json-fetch-app">
      <p className="json-fetch-app__hint">
        Start the backend: <code>npm run backend:fetch</code> (port 7070)
      </p>
      <div className="json-fetch-app__grid">
        <DataComponent />
        <ErrorComponent />
        <LoadingComponent />
      </div>
    </div>
  )
}

export default UseJsonFetchApp
