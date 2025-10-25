import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function TripDetail(){
  const router = useRouter()
  const { id } = router.query
  const [trip, setTrip] = useState(null)

  useEffect(()=>{
    if(!id) return
    fetch(`/api/trips/${id}`).then(r=>r.json()).then(setTrip)
  }, [id])

  if(!trip) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-2xl font-bold">{trip.title}</h2>
      <p className="text-gray-600">{trip.destination} • {trip.duration} days • ${trip.price}</p>
      <div className="mt-4">{trip.description}</div>
      <div className="mt-6">
        <button className="px-4 py-2 border rounded">Contact Planner</button>
      </div>
    </div>
  )
}
