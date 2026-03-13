import express from 'express'
import cors from 'cors'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 3003

app.use(cors())

const FEED_PATH = resolve(__dirname, '../activity-log/feed.jsonl')

app.get('/feed', (req, res) => {
  try {
    const raw = readFileSync(FEED_PATH, 'utf-8')
    const entries = raw
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        try { return JSON.parse(line) }
        catch { return null }
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.ts) - new Date(a.ts))
    res.json(entries)
  } catch (err) {
    res.json([])
  }
})

const CRONS = [
  { name: 'Morning Brief', schedule: '0 8 * * *', human: 'Daily at 8:00 AM', description: 'Daily 8AM brief to WhatsApp', active: true },
  { name: 'Daily Blog Pipeline', schedule: '0 7 * * *', human: 'Daily at 7:00 AM', description: 'Research + write 2 blogs + email', active: true },
  { name: '1418 Organizer Reminder', schedule: '0 8 * * *', human: 'Daily at 8:00 AM', description: 'Check for events 7/14 days out', active: true },
  { name: 'Content Factory', schedule: '0 9 * * 1,3,5', human: 'Mon/Wed/Fri at 9:00 AM', description: 'LinkedIn posts Mon/Wed/Fri', active: true },
  { name: 'Midday Check', schedule: '0 12 * * 1-5', human: 'Weekdays at 12:00 PM', description: 'Email + calendar weekdays', active: true },
  { name: 'Evening Check', schedule: '0 17 * * 1-5', human: 'Weekdays at 5:00 PM', description: 'Day wrap weekdays', active: true },
  { name: 'Project Health Check', schedule: '30 17 * * 1-5', human: 'Weekdays at 5:30 PM', description: 'Health scores weekdays', active: true },
  { name: 'Fireflies Sync', schedule: '0 18 * * *', human: 'Daily at 6:00 PM', description: 'Daily transcript sync', active: true },
  { name: 'Nightly Skill Discovery', schedule: '0 23 * * *', human: 'Daily at 11:00 PM', description: 'Discover new skills', active: true },
  { name: 'Nightly Code Improvement', schedule: '30 23 * * *', human: 'Daily at 11:30 PM', description: 'Code review pass', active: true },
  { name: 'Business Factory', schedule: '0 10 * * 0', human: 'Sundays at 10:00 AM', description: '5 business ideas Sundays', active: true },
  { name: 'Client Intelligence Brief', schedule: '*/30 7-19 * * 1-5', human: 'Every 30min 7AM-7PM weekdays', description: 'Client intelligence monitoring', active: true },
]

app.get('/crons', (req, res) => {
  res.json(CRONS)
})

app.listen(PORT, () => {
  console.log(`Control Room API running on http://localhost:${PORT}`)
})
