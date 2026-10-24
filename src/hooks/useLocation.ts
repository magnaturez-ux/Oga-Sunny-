"use client";

import { useCallback, useState } from "react";
import { DEFAULT_COORDS, type Coords } from "@/lib/geo";

export type LocationStatus = "idle" | "locating" | "found" | "denied" | "unsupported";

export function useLocation() {
  const [coords, setCoords] = useState<Coords>(DEFAULT_COORDS);
  const [status, setStatus] = useState<LocationStatus>("idle");

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("found");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  return { coords, status, locate };
}
