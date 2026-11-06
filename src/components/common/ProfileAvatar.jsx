function ProfileAvatar({ className = "", initials = "BE" }) {
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center rounded-full border border-[#00D4C7]/45 bg-linear-to-br from-[#00D4C7]/25 via-[#0d2627] to-[#071011] font-semibold tracking-wide text-[#bafff7] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_18px_rgba(0,212,199,0.12)] ${className}`}
    >
      {initials}
    </span>
  );
}

export default ProfileAvatar;
