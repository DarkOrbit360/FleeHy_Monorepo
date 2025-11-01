"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleAuth = async () => {
    setError(null);
    setMessage("");

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else {
        setMessage("Login successful!");
        onClose();
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage("Signup successful! Please log in.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {mode === "login" ? "Login to FleeHy" : "Create your FleeHy Account"}
        </h2>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-[#007a8d] text-white p-2 rounded-lg hover:bg-[#006874]"
        >
          {mode === "login" ? "Login" : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#007a8d] hover:underline"
              >
                Register
              </button>
            </>
          ) : (
            <>
              Already a user?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#007a8d] hover:underline"
              >
                Login
              </button>
            </>
          )}
        </p>

        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:underline text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
