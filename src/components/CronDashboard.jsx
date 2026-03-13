export default function CronDashboard({ crons }) {
  if (!crons.length) {
    return <div className="empty-state">Loading cron jobs...</div>
  }

  return (
    <div className="cron-grid">
      {crons.map((cron, i) => (
        <div key={i} className="cron-card">
          <div className="cron-card-header">
            <span className="cron-status-dot" />
            <span className="cron-name">{cron.name}</span>
          </div>
          <div className="cron-schedule">{cron.human}</div>
          <div className="cron-desc">{cron.description}</div>
        </div>
      ))}
    </div>
  )
}
