"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { supabase } from "@/lib/supabaseClient";

export default function VerifyHost() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    travelBrand: "",
    about: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) {
        setMessage("Please log in to continue.");
        setLoading(false);
        return;
      }

      // Future: Save host data to Supabase table (HostVerification)
      setTimeout(() => {
        setMessage("✅ Host verification submitted successfully!");
        setLoading(false);
        setTimeout(() => router.push("/dashboard"), 2000);
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
        <title>Become a Host | FleeHy</title>
      </Head>

      <div className="pt-24 min-h-screen bg-gradient-to-br from-[#e0f7ff] via-[#ffe0e6] to-[#fff1d0] flex flex-col items-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#007a8d] mb-2">
            Host Verification
          </h1>
          <p className="text-gray-700 max-w-md">
            Complete this quick form to verify yourself as a host and start
            creating unforgettable journeys on FleeHy.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="p-3 border rounded-lg w-full"
            />
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="p-3 border rounded-lg w-full"
            />
          </div>

          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="p-3 border rounded-lg w-full mb-4"
          />

          <input
            type="text"
            name="travelBrand"
            value={form.travelBrand}
            onChange={handleChange}
            placeholder="Your Travel Brand / Company Name"
            required
            className="p-3 border rounded-lg w-full mb-4"
          />

          <textarea
            name="about"
            value={form.about}
            onChange={handleChange}
            placeholder="Tell us about yourself or your travel experience..."
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
            {loading ? "Submitting..." : "Submit Verification"}
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
