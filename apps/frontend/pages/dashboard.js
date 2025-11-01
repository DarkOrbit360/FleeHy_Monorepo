"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("account");

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data?.user) router.push("/");
      else setUser(data.user);
    };
    getUser();
  }, [router]);

  const handleDeleteAccount = async () => {
    alert("Account deletion is disabled in demo mode.");
  };

  if (!user)
    return (
      <div className="h-screen flex items-center justify-center text-lg text-[#007a8d]">
        Loading dashboard...
      </div>
    );

  return (
    <div className="pt-20 min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="md:w-1/4 w-full bg-white p-6 shadow-lg rounded-r-3xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#007a8d] text-white text-3xl font-bold mb-3">
            {user.email[0].toUpperCase()}
          </div>
          <p className="text-lg font-semibold">Hi there!</p>
          <p className="text-sm text-gray-600 mb-4">{user.email}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("account")}
            className={`p-2 rounded-lg text-left ${
              activeTab === "account" ? "bg-[#e0f7ff]" : "hover:bg-gray-100"
            }`}
          >
            Account Details
          </button>
          <button
            onClick={() => setActiveTab("hosting")}
            className={`p-2 rounded-lg text-left ${
              activeTab === "hosting" ? "bg-[#e0f7ff]" : "hover:bg-gray-100"
            }`}
          >
            Host A Trip
          </button>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/");
            }}
            className="p-2 mt-4 bg-[#007a8d] text-white rounded-lg hover:bg-[#006874]"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 p-8">
        {activeTab === "account" && (
          <div>
            <h2 className="text-2xl font-bold text-[#007a8d] mb-4">
              Account Details
            </h2>
            <div className="bg-white p-6 rounded-xl shadow-md max-w-lg">
              <p className="mb-2">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <button
                onClick={handleDeleteAccount}
                className="mt-4 text-red-600 underline"
              >
                Delete Account
              </button>
            </div>
          </div>
        )}

        {activeTab === "hosting" && (
          <div>
            <h2 className="text-2xl font-bold text-[#007a8d] mb-6">
              Hosting Workflow
            </h2>

            <div className="bg-gradient-to-r from-[#fff1d0] via-[#ffe0e6] to-[#e0f7ff] rounded-2xl p-6 shadow-md">
              <div className="flex flex-col md:flex-row justify-around items-center text-center gap-6 font-bold text-gray-700">
                <div>
                  STEP 1
                  <br />
                  LOGIN & VERIFY AS HOST
                </div>
                <div>
                  STEP 2
                  <br />
                  HOST TRIP ON FLEEHY
                </div>
                <div>
                  STEP 3
                  <br />
                  USER FINDS THE TRIP
                </div>
              </div>
              <div className="text-center mt-6">
                <button
                  onClick={() => router.push("/host/verify")}
                  className="bg-[#007a8d] text-white px-6 py-2 rounded-lg hover:bg-[#006874]"
                >
                  Verify to Become a Host
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
