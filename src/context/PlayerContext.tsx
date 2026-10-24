"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { TRACKS, type Track } from "@/data/tracks";

type PlayerContextValue = {
  tracks: Track[];
  currentIndex: number;
  currentTrack: Track;
  isPlaying: boolean;
  hasStarted: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  error: string | null;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  next: () => void;
  prev: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [error, setError] = useState<string | null>(null);

  const currentTrack = TRACKS[currentIndex];

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setError(null);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const playTrack = useCallback(
    (index: number) => {
      const audio = audioRef.current;
      if (!audio) return;
      setHasStarted(true);
      if (index === currentIndex && audio.src) {
        void startPlayback();
        return;
      }
      setCurrentIndex(index);
      setCurrentTime(0);
      setDuration(0);
      setError(null);
      audio.src = TRACKS[index].src;
      audio.load();
      void startPlayback();
    },
    [currentIndex, startPlayback]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) {
      playTrack(currentIndex);
      return;
    }
    if (audio.paused) void startPlayback();
    else audio.pause();
  }, [currentIndex, playTrack, startPlayback]);

  const next = useCallback(() => {
    playTrack((currentIndex + 1) % TRACKS.length);
  }, [currentIndex, playTrack]);

  const prev = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }
    playTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);
  }, [currentIndex, playTrack]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(time)) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setVolumeState(clamped);
    if (audioRef.current) audioRef.current.volume = clamped;
  }, []);

  const nextRef = useRef(next);
  useEffect(() => {
    nextRef.current = next;
  }, [next]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = 0.8;
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onEnded = () => nextRef.current();
    const onError = () => {
      setIsPlaying(false);
      setError("Track never upload yet. Drop the mp3 inside /public/music.");
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
      audioRef.current = null;
    };
  }, []);

  const value = useMemo<PlayerContextValue>(
    () => ({
      tracks: TRACKS,
      currentIndex,
      currentTrack,
      isPlaying,
      hasStarted,
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
    }),
    [currentIndex, currentTrack, isPlaying, hasStarted, currentTime, duration, volume, error, playTrack, togglePlay, next, prev, seek, setVolume]
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used inside PlayerProvider");
  return ctx;
}

export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
