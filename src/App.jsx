import { useState, useEffect } from 'react'
import Header from './components/Header'
import ActivityFeed from './components/ActivityFeed'
import CronDashboard from './components/CronDashboard'

const API = 'http://localhost:3003'

export default function App() {
  const [feed, setFeed] = useState([])
  const [crons, setCrons] = useState([])
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchFeed = () => {
    fetch(`${API}/feed`)
      .then(r => r.json())
      .then(data => {
        setFeed(data)
        setLastUpdated(new Date())
      })
      .catch(() => {})
  }

  const fetchCrons = () => {
    fetch(`${API}/crons`)
      .then(r => r.json())
      .then(setCrons)
      .catch(() => {})
  }

  useEffect(() => {
    fetchFeed()
    fetchCrons()
    const interval = setInterval(fetchFeed, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="app">
      <Header lastUpdated={lastUpdated} />
      <main className="layout">
        <div className="col-feed">
          <h2 className="section-title">Live Activity Feed</h2>
          <ActivityFeed entries={feed} />
        </div>
        <div className="col-crons">
          <h2 className="section-title">Cron Jobs</h2>
          <CronDashboard crons={crons} />
        </div>
      </main>
    </div>
  )
}
