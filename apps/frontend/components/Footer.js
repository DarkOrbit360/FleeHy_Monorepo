export default function Footer() {
  return (
    <footer className="mt-auto bg-gradient-to-r from-[#008b9a] via-[#007a8d] to-[#006874] text-white text-sm py-6 sm:py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Left side links */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
          <a href="#" className="hover:text-[#aef2ec] transition">Terms & Conditions</a>
          <a href="#" className="hover:text-[#aef2ec] transition">Privacy Policy</a>
          <a href="#" className="hover:text-[#aef2ec] transition">Cookie Policy</a>
          <a href="#" className="hover:text-[#aef2ec] transition">About Us</a>
          <a href="#" className="hover:text-[#aef2ec] transition">Help</a>
        </div>

        {/* Right side copyright */}
        <p className="text-center sm:text-right text-[#e8fdfb] mt-2 sm:mt-0">
          © FleeHy Ltd 2025 – 2026
        </p>
      </div>
    </footer>
  );
}
