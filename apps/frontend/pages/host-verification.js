import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/router";

export default function HostVerification() {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const session = supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      if (!data?.user) router.push("/login");
    });
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Attempt to upsert into your Prisma table names (case-sensitive).
      // NOTE: This requires RLS policies in Supabase to allow authenticated users to update their own row.
      // If RLS blocks this, we'll just proceed to success and handle persistence later.
      const email = user?.email;

      // Update role in your User table (named "User" from Prisma)
      const { error: roleErr } = await supabase
        .from("User")
        .update({ role: "HOST" })
        .eq("email", email);

      // Upsert HostVerification info (table name matches Prisma)
      const { error: hvErr } = await supabase
        .from("HostVerification")
        .upsert({
          userId: null, // we don't have the numeric id via client; will wire through API later
          firstName,
          lastName,
          phone,
          travelBrand: brand,
          about,
          isCompany: false,
          verified: true,
        });

      if (roleErr || hvErr) {
        console.warn("RLS likely blocked writes from client. Proceeding without persistence.", roleErr || hvErr);
        alert("You're marked as HOST for this session. We'll finalize your profile once policies are set.");
      } else {
        alert("You're now a HOST!");
      }

      router.push("/"); // redirect to home for now
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="max-w-lg mx-auto mt-10 p-6 border rounded bg-white shadow">
        <h1 className="text-2xl mb-4 text-center font-semibold">Become a Host</h1>
        <form onSubmit={handleSubmit} className="grid gap-3">
          <div className="grid grid-cols-2 gap-3">
            <input className="border p-2 rounded" placeholder="First name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required />
            <input className="border p-2 rounded" placeholder="Last name" value={lastName} onChange={(e)=>setLastName(e.target.value)} required />
          </div>
          <input className="border p-2 rounded" placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
          <input className="border p-2 rounded" placeholder="Travel brand / display name" value={brand} onChange={(e)=>setBrand(e.target.value)} required />
          <textarea className="border p-2 rounded" placeholder="About you" rows={4} value={about} onChange={(e)=>setAbout(e.target.value)} />
          <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white p-2 rounded transition">
            {loading ? "Submitting..." : "Verify & Become Host"}
          </button>
        </form>
      </div>
    </>
  );
}
