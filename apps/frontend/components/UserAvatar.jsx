export default function UserAvatar({ email }) {
  const initials = email ? email[0].toUpperCase() : "?";
  return (
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#007a8d] font-bold text-lg shadow-sm">
      {initials}
    </div>
  );
}
