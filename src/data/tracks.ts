export type Track = {
  id: string;
  title: string;
  artist: string;
  src: string;
  lyrics: string[];
};

export const TRACKS: Track[] = [
  {
    id: "t1",
    title: "OORGANIC No Be Mechanic",
    artist: "PK",
    src: "/music/oorganic-no-be-mechanic.mp3",
    lyrics: [
      "Oorganic, no be mechanic",
      "We no dey fake am, everything natural",
      "From Mararaba straight to the world",
      "Sunny dey shine for every boy and girl",
      "",
      "No spanner, no screw, na pure vibe",
      "Hustle for trenches keep us alive",
      "Oorganic, no be mechanic — PK!",
    ],
  },
  {
    id: "t2",
    title: "Mararaba at Night",
    artist: "PK",
    src: "/music/mararaba-at-night.mp3",
    lyrics: [
      "Street light yellow, suya smoke for air",
      "Okada horn dey sing, everybody dey there",
      "Mararaba at night, the city no dey sleep",
      "Gather your people, the vibe dey deep",
      "",
      "From the junction to the bridge",
      "We dey move like say na privilege",
      "Mararaba at night, Mararaba at night",
    ],
  },
  {
    id: "t3",
    title: "Fine Fine Girls",
    artist: "PK",
    src: "/music/fine-fine-girls.mp3",
    lyrics: [
      "Fine fine girls for New Nyanya",
      "Dem dey shine like morning sun for Ado",
      "Masaka queen, One Man princess",
      "Everybody dey dance, no stress",
      "",
      "Shake am small, wine am slow",
      "Oga Sunny dey for the show",
      "Fine fine girls, fine fine girls",
    ],
  },
];
