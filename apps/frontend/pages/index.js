import { API_BASE } from '../lib/api';
import { useState, useEffect } from "react";
import TripCard from "../components/TripCard";
import Footer from "../components/Footer";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/v1/trips`);
        const json = await res.json();
        setResults(json || []);
      } catch (e) {
        console.error("Trending trips load error:", e);
      }
    })();
  }, []);

  async function search(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/v1/trips?destination=${encodeURIComponent(query)}`);
      const json = await res.json();
      setResults(json || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 106, 112, 0.35), rgba(0, 106, 112, 0.35)), url('/beach.avif')",
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
          Trips Made Easier Than Ever Before
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-10 animate-fade-in-up">
          Discover unique travel experiences hosted by locals around the world.
        </p>

        {/* Responsive Search Bar */}
        <form
  onSubmit={search}
  className="flex flex-col sm:flex-row items-center gap-3 bg-white/90 backdrop-blur-lg shadow-lg px-6 py-4 rounded-full max-w-4xl w-[90%] mx-auto animate-fade-in-up"
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Destination"
    className="flex-1 px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400"
  />

  <input
    type="date"
    value={fromDate}
    onChange={(e) => setFromDate(e.target.value)}
    placeholder="From"
    className="px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400 w-full sm:w-auto"
  />

  <input
    type="date"
    value={toDate}
    onChange={(e) => setToDate(e.target.value)}
    placeholder="To"
    className="px-5 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-gray-700 placeholder-gray-400 w-full sm:w-auto"
  />

  <button
    disabled={loading}
    className="px-6 py-3 bg-gradient-to-r from-[#00b3ad] to-[#008b9a] text-white font-semibold rounded-full shadow hover:opacity-90 transition disabled:opacity-50 w-full sm:w-auto"
  >
    {loading ? "Searching..." : "Search"}
  </button>
</form>
      </section>

      {/* Trending Trips */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Trending Trips
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.length > 0 ? (
            results.map((t) => <TripCard key={t.id} trip={t} />)
          ) : (
            <div className="col-span-full text-gray-500 text-center">
              {loading ? "Loading..." : "No trips yet. Try searching a destination."}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
