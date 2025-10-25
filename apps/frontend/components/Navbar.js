import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#008b9a] via-[#007a8d] to-[#006874] backdrop-blur-lg bg-opacity-90 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-3xl font-extrabold tracking-tight text-white">
          FleeHy
        </Link>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/login?from=host" className="hover:text-[#32d1c0] transition">
            Host
          </Link>
          <Link href="/login" className="hover:text-[#32d1c0] transition">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
