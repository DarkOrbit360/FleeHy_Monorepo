// components/TripForm.js
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TripForm({ user }) {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from("Trip").insert([
      {
        title: form.title,
        destination: form.destination,
        duration: parseInt(form.duration),
        price: parseFloat(form.price),
        description: form.description,
        images: form.images.join(","),
        plannerId: user.id,
      },
    ]);

    setLoading(false);

    if (error) alert(error.message);
    else alert("Trip created successfully!");
  };

  return (
    <div className="max-w-lg mx-auto p-6 border rounded-lg shadow bg-white">
      <h2 className="text-xl font-semibold mb-4">Create a New Trip</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="title"
          placeholder="Trip Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          name="destination"
          placeholder="Destination"
          className="border p-2 rounded"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          name="duration"
          type="number"
          placeholder="Duration (days)"
          className="border p-2 rounded"
          value={form.duration}
          onChange={handleChange}
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          className="border p-2 rounded"
          value={form.price}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Short description"
          className="border p-2 rounded"
          rows="3"
          value={form.description}
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}
