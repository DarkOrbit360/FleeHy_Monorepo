"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState("Verifying your email... please wait.");

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Session error:", error);
        setStatus("Something went wrong during verification.");
        return;
      }

      if (data?.session) {
        setStatus("✅ Email verified successfully! Redirecting...");
        setTimeout(() => router.push("/"), 2000); // 👈 your line goes here
      } else {
        setStatus("Verification failed or expired link.");
      }
    };

    handleSession();
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-xl text-[#007a8d] font-medium">
      {status}
    </div>
  );
}
