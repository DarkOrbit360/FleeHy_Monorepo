"use client";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Session error:", error);
      else if (data?.session) {
        router.push("/"); // or /dashboard
      }
    };
    handleSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-xl text-[#007a8d]">
      Verifying your email... please wait.
    </div>
  );
}
