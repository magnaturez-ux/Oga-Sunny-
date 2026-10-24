"use client";

import PageHeader from "@/components/PageHeader";
import { formatTime, usePlayer } from "@/context/PlayerContext";
import { NextIcon, PauseIcon, PlayIcon, PrevIcon, VolumeIcon } from "@/components/Icons";

export default function MusicPage() {
  const {
    tracks,
    currentIndex,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    error,
    playTrack,
    togglePlay,
    next,
    prev,
    seek,
    setVolume,
  } = usePlayer();

  return (
    <div className="space-y-6">
      <PageHeader kicker="Oga Sunny Radio" title="PK Official Playlist" subtitle="OORGANIC NO BE MECHANIC. Music keeps playing while you browse." />

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section aria-label="Now playing" className="space-y-5 rounded-2xl border-2 border-neon p-5">
          <div className="space-y-1">
            <p className="text-xs font-black uppercase tracking-widest text-sun">Now playing</p>
            <h2 className="font-graffiti text-3xl leading-tight text-neon text-balance">{currentTrack.title}</h2>
            <p className="text-white/70">{currentTrack.artist}</p>
          </div>

          {error ? (
            <p role="alert" className="rounded-lg border border-sun/50 bg-sun/10 px-3 py-2 text-sm text-sun">
              {error}
            </p>
          ) : null}

          <div className="space-y-1">
            <label htmlFor="progress" className="sr-only">Seek</label>
            <input
              id="progress"
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(currentTime, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              disabled={!duration}
              className="w-full accent-[#00FF88]"
            />
            <div className="flex justify-between text-xs tabular-nums text-white/60">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-5">
            <button type="button" onClick={prev} aria-label="Previous track" className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/20 hover:border-sun hover:text-sun">
              <PrevIcon className="h-5 w-5" />
            </button>
            <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="grid h-16 w-16 place-items-center rounded-full bg-neon text-black shadow-neon">
              {isPlaying ? <PauseIcon className="h-7 w-7" /> : <PlayIcon className="h-7 w-7" />}
            </button>
            <button type="button" onClick={next} aria-label="Next track" className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/20 hover:border-sun hover:text-sun">
              <NextIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <VolumeIcon className="h-5 w-5 shrink-0 text-sun" />
            <label htmlFor="volume" className="sr-only">Volume</label>
            <input
              id="volume"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-[#FFD400]"
            />
            <span className="w-10 text-right text-xs tabular-nums text-white/60">{Math.round(volume * 100)}%</span>
          </div>

          <ol className="divide-y divide-white/10 overflow-hidden rounded-xl border border-white/15">
            {tracks.map((t, i) => {
              const active = i === currentIndex;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => playTrack(i)}
                    aria-current={active ? "true" : undefined}
                    className={`flex w-full items-center gap-3 px-4 py-3 text-left ${active ? "bg-neon/10" : "hover:bg-white/5"}`}
                  >
                    <span className="w-5 font-graffiti text-sun">{i + 1}</span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate font-bold ${active ? "text-neon" : ""}`}>{t.title}</span>
                      <span className="block text-xs text-white/60">{t.artist}</span>
                    </span>
                    {active && isPlaying ? <span className="text-xs font-black uppercase text-neon">Playing</span> : null}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>

        <section aria-label="Lyrics" className="rounded-2xl border-2 border-sun p-5">
          <h2 className="mb-4 text-xs font-black uppercase tracking-widest text-sun">Lyrics</h2>
          <div className="space-y-1 font-graffiti text-lg leading-relaxed">
            {currentTrack.lyrics.map((line, i) =>
              line ? <p key={i}>{line}</p> : <div key={i} className="h-4" aria-hidden />
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
