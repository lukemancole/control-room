export default function Header({ lastUpdated }) {
  const fmt = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '...'

  return (
    <header className="header">
      <div>
        <h1 className="header-title">Transformious Control Room</h1>
        <p className="header-subtitle">AI Operations Dashboard</p>
      </div>
      <div className="header-meta">
        Last updated: {fmt}
      </div>
    </header>
  )
}
