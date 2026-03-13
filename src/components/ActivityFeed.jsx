function timeAgo(ts) {
  const diff = Date.now() - new Date(ts).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

const AGENT_COLORS = {
  que: '#0B5CFF',
  'claude-code': '#9B59B6',
  cron: '#1ABC9C',
}

const STATUS_COLORS = {
  success: '#92D050',
  warning: '#F0AD4E',
  error: '#E74C3C',
}

export default function ActivityFeed({ entries }) {
  if (!entries.length) {
    return <div className="empty-state">No activity yet...</div>
  }

  return (
    <div className="feed">
      {entries.map((entry, i) => (
        <div
          key={`${entry.ts}-${i}`}
          className="feed-card"
          style={{ borderLeftColor: STATUS_COLORS[entry.status] || '#555' }}
        >
          <div className="feed-card-header">
            <span
              className="agent-badge"
              style={{ backgroundColor: AGENT_COLORS[entry.agent] || '#555' }}
            >
              {entry.agent}
            </span>
            <span className="feed-time">{timeAgo(entry.ts)}</span>
          </div>
          <div className="feed-label">{entry.label}</div>
          <div className="feed-summary">{entry.summary}</div>
          {entry.filesChanged?.length > 0 && (
            <div className="feed-pills">
              {entry.filesChanged.map((f, j) => (
                <span key={j} className="pill pill-file">{f}</span>
              ))}
            </div>
          )}
          {entry.tags?.length > 0 && (
            <div className="feed-pills">
              {entry.tags.map((t, j) => (
                <span key={j} className="pill pill-tag">{t}</span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
