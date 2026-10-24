type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  viewBox: "0 0 24 24",
};

export const HomeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M10 21v-6h4v6" /></svg>
);
export const SearchIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
);
export const ChopIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M4 3v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V3" /><path d="M6 13v8" /><path d="M17 3c-2 0-3 2-3 5s1 5 3 5v8" /></svg>
);
export const RadioIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><rect x="3" y="8" width="18" height="13" rx="2" /><path d="m7 8 10-5" /><circle cx="15" cy="14.5" r="2.5" /><path d="M6 13h4M6 16h4" /></svg>
);
export const KeyIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><circle cx="8" cy="15" r="4" /><path d="m11 12 9-9" /><path d="m17 6 3 3" /><path d="m15 8 2 2" /></svg>
);
export const PlayIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M7 4.5v15l13-7.5z" /></svg>
);
export const PauseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
);
export const NextIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M5 5v14l10-7z" /><rect x="16" y="5" width="3" height="14" rx="1" /></svg>
);
export const PrevIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}><path d="M19 5v14L9 12z" /><rect x="5" y="5" width="3" height="14" rx="1" /></svg>
);
export const VolumeIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M4 9v6h4l5 4V5L8 9z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /></svg>
);
export const PinIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
export const PhoneIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
);
export const ChatIcon = ({ className }: IconProps) => (
  <svg {...base} className={className}><path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" /></svg>
);
