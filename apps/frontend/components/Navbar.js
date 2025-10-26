"use client";
import Link from "next/link";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function Navbar() {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'host'

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#008b9a] via-[#007a8d] to-[#006874] backdrop-blur-lg bg-opacity-90 text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-white">
            FleeHy
          </Link>

          <div className="flex items-center gap-6 font-medium">
            <button
              onClick={() => {
                setAuthMode("host");
                setShowAuth(true);
              }}
              className="hover:text-[#32d1c0] transition"
            >
              Host
            </button>
            <button
              onClick={() => {
                setAuthMode("login");
                setShowAuth(true);
              }}
              className="hover:text-[#32d1c0] transition"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {showAuth && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuth(false)}
        />
      )}
    </>
  );
}
