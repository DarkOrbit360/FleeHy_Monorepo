import { useRouter } from 'next/router'

export default function Register(){
  const router = useRouter()

  function choose(role){
    router.push(`/planner/dashboard?role=${role}`)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Become a Trip Planner</h2>
      <p>Choose your role to continue</p>
      <div className="flex gap-4">
        <button onClick={()=>choose('PLANNER')} className="px-4 py-2 bg-green-600 text-white rounded">I'm a Planner</button>
        <button onClick={()=>choose('TRAVELER')} className="px-4 py-2 border rounded">I'm a Traveler</button>
      </div>
    </div>
  )
}
