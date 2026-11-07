import { useJsonFetch } from './useJsonFetch'

function ErrorComponent() {
  const [data, loading, error] = useJsonFetch<{ status: string }>(
    'http://localhost:7070/error',
  )

  return (
    <div className="json-fetch-card">
      <h3>GET /error</h3>
      {loading && <p>Loading…</p>}
      {error && <p className="json-fetch-card__error">{error.message}</p>}
      {data && (
        <pre className="json-fetch-card__ok">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default ErrorComponent
