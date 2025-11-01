"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function NewTrip() {
  const router = useRouter();
  const [trip, setTrip] = useState({
    title: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setMessage("Please log in first.");
        setLoading(false);
        return;
      }

      // TODO: Save trip to backend API
      // For now, simulate success:
      setTimeout(() => {
        setMessage("✅ Trip created successfully!");
        setLoading(false);
        setTimeout(() => router.push("/dashboard"), 1500);
      }, 1000);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Trip | FleeHy</title>
      </Head>
      <div className="pt-24 min-h-screen bg-gradient-to-br from-[#e0f7ff] via-[#ffe0e6] to-[#fff1d0] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#007a8d] mb-2">
            Create a New Trip
          </h1>
          <p className="text-gray-700 max-w-md">
            Add details about your trip so travelers can discover and book it.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
        >
          <input
            type="text"
            name="title"
            value={trip.title}
            onChange={handleChange}
            placeholder="Trip Title"
            required
            className="p-3 border rounded-lg w-full mb-4"
          />

          <input
            type="text"
            name="destination"
            value={trip.destination}
            onChange={handleChange}
            placeholder="Destination"
            required
            className="p-3 border rounded-lg w-full mb-4"
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="number"
              name="duration"
              value={trip.duration}
              onChange={handleChange}
              placeholder="Duration (days)"
              required
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="number"
              name="price"
              value={trip.price}
              onChange={handleChange}
              placeholder="Price ($)"
              required
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <textarea
            name="description"
            value={trip.description}
            onChange={handleChange}
            placeholder="Trip Description"
            rows={4}
            required
            className="p-3 border rounded-lg w-full mb-6"
          />

          {message && (
            <p
              className={`text-center text-sm mb-4 ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#007a8d] hover:bg-[#006874]"
            }`}
          >
            {loading ? "Saving..." : "Save Trip"}
          </button>
        </form>

        <div className="text-sm text-gray-600 mt-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="underline hover:text-[#007a8d]"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </>
  );
}
