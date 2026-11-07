import { useJsonFetch } from './useJsonFetch'

function DataComponent() {
  const [data, loading, error] = useJsonFetch<{ status: string }>(
    'http://localhost:7070/data',
  )

  return (
    <div className="json-fetch-card">
      <h3>GET /data</h3>
      {loading && <p>Loading…</p>}
      {error && <p className="json-fetch-card__error">{error.message}</p>}
      {data && (
        <pre className="json-fetch-card__ok">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  )
}

export default DataComponent
