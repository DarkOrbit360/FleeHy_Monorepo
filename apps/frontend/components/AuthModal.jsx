"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AuthModal({ onClose }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Password complexity validation
  const validatePassword = (password) => {
    const minLength = /.{8,}/;
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;
    const commonPatterns = /(1234|password|qwerty|abcd|1111)/i;

    if (!minLength.test(password))
      return "Password must be at least 8 characters long.";
    if (!uppercase.test(password))
      return "Password must include at least one uppercase letter.";
    if (!number.test(password))
      return "Password must include at least one number.";
    if (!specialChar.test(password))
      return "Password must include at least one special character.";
    if (commonPatterns.test(password))
      return "Password is too common or predictable.";
    return null;
  };

  // Handle login/signup
  const handleAuth = async () => {
    setError("");
    setMessage("");

    if (mode === "signup") {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) setError(error.message);
      else
        setMessage(
          "Signup successful! Please verify your email before logging in."
        );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      else {
        setMessage("Login successful!");
        setTimeout(onClose, 1000);
      }
    }
  };

  return (
    // Outer overlay (fade in)
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      {/* Modal card (slide-up effect) */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-96 relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#007a8d] text-center">
          {mode === "login" ? "Login" : "Register"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-[#007a8d]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#007a8d]"
        />

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}

        <button
          onClick={handleAuth}
          className="w-full bg-[#007a8d] text-white py-2 rounded-lg hover:bg-[#006874] transition"
        >
          {mode === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-[#007a8d] font-semibold hover:underline"
              >
                Register here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-[#007a8d] font-semibold hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>

      {/* Animation keyframes (inline Tailwind custom) */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
