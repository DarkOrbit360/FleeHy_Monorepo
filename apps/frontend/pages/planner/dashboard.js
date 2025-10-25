import { useState, useEffect } from 'react'
import TripForm from '../../components/TripForm'
import TripCard from '../../components/TripCard'

export default function Dashboard(){
  const [trips, setTrips] = useState([])

  async function load(){
    const res = await fetch('/api/trips')
    const json = await res.json()
    setTrips(json)
  }

  useEffect(()=>{ load() }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Planner Dashboard</h2>
      <TripForm onDone={load} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {trips.map(t => <TripCard key={t.id} trip={t} />)}
      </div>
    </div>
  )
}
