// components/TripCard.js
import Image from "next/image";

export default function TripCard({ trip }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition overflow-hidden bg-white">
      {trip.images && (
        <div className="relative w-full h-48">
          <Image
            src={Array.isArray(trip.images) ? trip.images[0] : trip.images.split(",")[0]}
            alt={trip.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{trip.title}</h3>
        <p className="text-gray-600 text-sm mb-1">{trip.destination}</p>
        {trip.duration && (
          <p className="text-gray-500 text-sm">Duration: {trip.duration} days</p>
        )}
        {trip.price && (
          <p className="text-gray-800 font-medium mt-1">₹{trip.price}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          Hosted by: {trip.planner?.name || "Local Host"}
        </p>
      </div>
    </div>
  );
}
