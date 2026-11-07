import { useJsonFetch } from './useJsonFetch'

function LoadingComponent() {
  const [data, loading, error] = useJsonFetch<{ status: string }>(
    'http://localhost:7070/loading',
  )

  return (
    <div className="json-fetch-card">
      <h3>GET /loading</h3>
      {loading && <p className="json-fetch-card__loading">Loading… (≈5s)</p>}
      {error && <p className="json-fetch-card__error">{error.message}</p>}
      {data && (
        <pre className="json-fetch-card__ok">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default LoadingComponent
