'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

type Track = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  audio: string;
  lyrics: string[];
};

type PlayerContextValue = {
  tracks: Track[];
  currentTrackIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: () => void;
  playTrack: (index: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  seek: (time: number) => void;
  setVolume: (value: number) => void;
};

const defaultTracks: Track[] = [
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

const PlayerContext = createContext<PlayerContextValue | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [tracks] = useState<Track[]>(defaultTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);

  const currentTrack = tracks[currentTrackIndex] ?? tracks[0];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration || 0);
    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [tracks.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = currentTrack.audio;
    audio.load();
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrack, isPlaying]);

  const playTrack = (index: number) => {
    const safeIndex = (index + tracks.length) % tracks.length;
    setCurrentTrackIndex(safeIndex);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.src = currentTrack.audio;
    audio.load();
    audio.play();
    setIsPlaying(true);
  };

  const nextTrack = () => {
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    const prevIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIndex);
    setIsPlaying(true);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const setVolume = (value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setVolumeState(clamped);
  };

  return (
    <PlayerContext.Provider
      value={{
        tracks,
        currentTrackIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        audioRef,
        togglePlay,
        playTrack,
        nextTrack,
        prevTrack,
        seek,
        setVolume
      }}
    >
      <audio ref={audioRef} preload="metadata" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error('usePlayer must be used inside PlayerProvider');
  }

  return context;
}
