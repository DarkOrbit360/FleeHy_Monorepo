"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthModal({ onClose, mode = "login" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login"); // or 'signup'
  const [error, setError] = useState(null);

  const handleAuth = async () => {
    setError(null);
    let res;
    if (mode === "login") {
      res = await supabase.auth.signInWithPassword({ email, password });
    } else {
      res = await supabase.auth.signUp({ email, password });
    }
    if (res.error) setError(res.error.message);
    else onClose(); // close modal if successful
  };

  const handleOAuth = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">
          {mode === "login" ? "Login to FleeHy" : "Sign Up for FleeHy"}
        </h2>
        <input
          type="email"
          placeholder="Email"
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
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white p-2 rounded mb-3 hover:bg-blue-700"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <div className="flex justify-center gap-3 mb-3">
          <button
            onClick={() => handleOAuth("google")}
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            Google
          </button>
          <button
            onClick={() => handleOAuth("apple")}
            className="border px-3 py-1 rounded hover:bg-gray-100"
          >
            Apple
          </button>
        </div>

        <p className="text-center text-sm">
          {mode === "login" ? (
            <>
              Not a user?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-blue-600 hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-blue-600 hover:underline"
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
