"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import UserAvatar from "@/components/UserAvatar";
import AuthModal from "@/components/AuthModal"; // 👈 Added back

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false); // 👈 Added

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    fetchUser();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdown(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#008b9a] via-[#007a8d] to-[#006874] text-white shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-3xl font-extrabold tracking-tight text-white">
            FleeHy
          </Link>

          {!user ? (
            <div className="flex items-center gap-6 font-medium">
              <Link
                href="/login?from=host"
                className="hover:text-[#32d1c0] transition"
              >
                Host
              </Link>
              {/* 👇 Changed from Link to button for popup */}
              <button
                onClick={() => setShowAuthModal(true)}
                className="hover:text-[#32d1c0] transition"
              >
                Login
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdown(!dropdown)}
                className="focus:outline-none"
              >
                <UserAvatar email={user.email} />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-3 w-40 bg-white text-gray-700 rounded-lg shadow-lg">
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg"
                    onClick={() => setDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* 👇 Add the AuthModal here so it overlays above everything */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </>
  );
}
