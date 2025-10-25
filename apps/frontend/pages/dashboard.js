import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("TRAVELER");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const u = data?.user || null;
      setUser(u);

      // Try fetch role from your Prisma User table if available
      if (u?.email) {
        const { data: row } = await supabase
          .from("User")
          .select("role")
          .eq("email", u.email)
          .maybeSingle();
        if (row?.role) setRole(row.role);
      }
      setLoading(false);
    })();
  }, []);

  if (loading) return <Layout title="Dashboard"><p>Loading...</p></Layout>;
  if (!user) return <Layout title="Dashboard"><p>Please log in to see your dashboard.</p></Layout>;

  const isHost = role === "HOST";

  return (
    <Layout title="Dashboard">
      <h1 className="text-2xl font-semibold mb-4">Welcome{user?.email ? `, ${user.email}` : ""}</h1>

      {isHost ? (
        <div className="space-y-4">
          <p className="text-gray-700">You are a <strong>HOST</strong>. Create and manage your trips here.</p>
          <a href="/planner" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create a Trip</a>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-gray-700">You are currently a <strong>Traveler</strong>.</p>
          <a href="/host-verification" className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Become a Host</a>
        </div>
      )}
    </Layout>
  );
}
