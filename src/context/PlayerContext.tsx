'use client';

import { usePlayer } from '@/src/context/PlayerContext';

const playlist = [
  {
    id: 'track-1',
    title: 'OORGANIC No Be Mechanic',
    artist: 'PK',
    duration: '3:21',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: [
      'OORGANIC no be mechanic, we carry the vibe.',
      'From the trenches to the city, we still survive.',
      'No fake shine, no borrowed swagger in the air.',
      'We carry truth like a drum in the blood we share.'
    ]
  },
  {
    id: 'track-2',
    title: 'Mararaba at Night',
    artist: 'Sunny Crew',
    duration: '4:02',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    lyrics: [
      'Mararaba at night, the road dey glow.',
      'Street lights dance on every shoulder and flow.',
      'Big dreams rolling while the music hums low.',
      'We move with purpose, and the skyline knows.'
    ]
  },
  {
    id: 'track-3',
    title: 'Fine Fine Girls',
    artist: 'Oga Sunny',
    duration: '3:45',
    audio: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    lyrics: [
      'Fine fine girls with sweet, sweet grace.',
      'They turn the heat into a smooth, warm race.',
      'From the dance hall to the early dawn parade.',
      'We keep the rhythm and the love alive.'
    ]
  }
];

export default function MusicPage() {
  const {
    currentTrack,
    currentTrackIndex,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
    playTrack
  } = usePlayer();

  const progressValue = duration ? (currentTime / duration) * 100 : 0;

  return (
    <main className="bg-[#020202] px-4 pb-24 pt-8 text-white sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <p className="yellow-glow text-xs font-bold uppercase tracking-[0.3em]">Radio</p>
          <h1 className="graffiti mt-2 text-3xl uppercase text-[#00FF88]">Oga Sunny Africa Radio</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="neon-border rounded-3xl bg-black p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#FFD60A]">Now playing</p>
                <h2 className="mt-2 text-2xl font-black text-[#00FF88]">{currentTrack.title}</h2>
                <p className="text-zinc-400">{currentTrack.artist}</p>
              </div>
              <div className="rounded-full border border-[#00FF88] px-3 py-1 text-xs uppercase text-[#00FF88]">
                {isPlaying ? 'Live' : 'Paused'}
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-[#FFD60A] bg-[#111111] p-4">
              <div className="mb-4 flex items-center justify-between text-xs text-zinc-400">
                <span>{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
                <span>{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={(event) => seek(Number(event.target.value))}
                className="w-full accent-[#00FF88]"
              />
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full rounded-full bg-[#00FF88]" style={{ width: `${progressValue}%` }} />
              </div>
            </div>

            <div className="mb-5 flex items-center justify-center gap-4">
              <button onClick={prevTrack} className="rounded-full border border-[#00FF88] px-4 py-2 text-sm font-bold text-[#00FF88]">
                Prev
              </button>
              <button onClick={togglePlay} className="rounded-full bg-[#00FF88] px-6 py-3 text-sm font-black uppercase text-black">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={nextTrack} className="rounded-full border border-[#00FF88] px-4 py-2 text-sm font-bold text-[#00FF88]">
                Next
              </button>
            </div>

            <div className="rounded-2xl border border-[#00FF88] bg-black p-4">
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-300">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="w-full accent-[#FFD60A]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="neon-border rounded-2xl bg-black p-4">
              <h3 className="mb-3 text-lg font-bold uppercase text-[#FFD60A]">Playlist</h3>
              <div className="space-y-3">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => playTrack(index)}
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${index === currentTrackIndex ? 'border-[#00FF88] bg-[#07150d]' : 'border-[#00FF88]/40 bg-[#0d0d0d]'}`}
                  >
                    <div>
                      <p className="font-bold text-white">{track.title}</p>
                      <p className="text-sm text-zinc-400">{track.artist}</p>
                    </div>
                    <span className="text-xs text-[#FFD60A]">{track.duration}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="neon-border rounded-2xl bg-black p-4">
              <h3 className="mb-3 text-lg font-bold uppercase text-[#FFD60A]">Lyrics</h3>
              <div className="space-y-2 text-sm text-zinc-300">
                {currentTrack.lyrics.map((line, index) => (
                  <p key={`${currentTrack.id}-${index}`}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
