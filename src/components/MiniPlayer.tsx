"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlayer } from "@/context/PlayerContext";
import { NextIcon, PauseIcon, PlayIcon } from "@/components/Icons";

export default function MiniPlayer() {
  const { currentTrack, isPlaying, hasStarted, currentTime, duration, togglePlay, next, error } =
    usePlayer();
  const pathname = usePathname();

  if (!hasStarted || pathname === "/music") return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-x-0 bottom-[68px] z-40 px-3 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-xl overflow-hidden rounded-xl border-2 border-neon bg-black shadow-neon">
        <div className="h-1 bg-white/10">
          <div className="h-full bg-sun transition-[width]" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-3 p-2.5">
          <Link href="/music" className="min-w-0 flex-1">
            <p className="truncate font-graffiti text-sm text-neon">{currentTrack.title}</p>
            <p className="truncate text-xs text-white/60">
              {error ? error : `${currentTrack.artist} · Oga Sunny Radio`}
            </p>
          </Link>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="grid h-10 w-10 place-items-center rounded-full bg-neon text-black"
          >
            {isPlaying ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next track"
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white hover:text-sun"
          >
            <NextIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
