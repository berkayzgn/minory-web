import { ChordFinger } from "./types";

export interface UkuleleChordPosition {
  id: string;
  fingering: ChordFinger[];
  baseFret: number;
  chordFret: number;
}

export interface GeneratedUkuleleChord {
  key: string;
  type: string;
  positions: UkuleleChordPosition[];
}

// Ukulele akor veritabanı
// String order: 0=A, 1=E, 2=C, 3=G (üstten aşağıya)
const UKULELE_CHORDS: Record<string, Record<string, UkuleleChordPosition[]>> = {
  C: {
    major: [
      {
        id: "c-maj-1",
        baseFret: 0,
        chordFret: 3,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "c-min-1",
        baseFret: 0,
        chordFret: 3,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 3, finger: 3, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "c-7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "c-m7-1",
        baseFret: 0,
        chordFret: 3,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 3, finger: 3, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "c-maj7-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "c-9-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, type: "played", finger: 2 },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
  },

  "C#": {
    major: [
      {
        id: "c#-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 4, finger: 4, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "c#-min",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 4, finger: 2, type: "played" },
          { string: 1, fret: 4, finger: 3, type: "played" },
          { string: 0, fret: 4, finger: 4, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "c#-7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "c#-m7",
        baseFret: 1,
        chordFret: 4,
        fingering: [
          { string: 3, fret: 1, finger: 3, type: "played" },
          { string: 2, fret: 1, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 3, type: "played" },
          { string: 0, fret: 1, finger: 3, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "c#-maj7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "c#-9",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 4, type: "played" },
          { string: 1, fret: 1, finger: 2, type: "played" },
          { string: 0, fret: 2, finger: 3, type: "played" },
        ],
      },
    ],
  },

  D: {
    major: [
      {
        id: "d-maj-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 5, finger: 4, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "d-min-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 2, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    "7": [
      {
        id: "d-7-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 2, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "d-m7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 2, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 4, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "d-maj7-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 4, finger: 3, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "d-9-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 4, finger: 4, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
  },

  "D#": {
    major: [
      {
        id: "d#-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 3, finger: 4, type: "played" },
          { string: 1, fret: 3, finger: 2, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "d#-min",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 3, finger: 4, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "d#-7",
        baseFret: 1,
        chordFret: 3,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "d#-m7",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 3, finger: 2, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 4, finger: 4, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "d#-maj7",
        baseFret: 1,
        chordFret: 3,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "d#-9",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
  },

  E: {
    major: [
      {
        id: "e-maj-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 4, finger: 3, type: "played" },
          { string: 2, fret: 4, finger: 3, type: "played" },
          { string: 1, fret: 4, finger: 3, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "e-min-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 4, finger: 3, type: "played" },
          { string: 1, fret: 3, finger: 2, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "e-7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 2, finger: 3, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "e-m7-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "e-maj7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "e-9-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
  },

  F: {
    major: [
      {
        id: "f-maj-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    minor: [
      {
        id: "f-min-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 1, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 4, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "f-7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    m7: [
      {
        id: "f-m7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 4, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "f-maj7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 4, finger: 4, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "f-9-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 3, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 2, type: "played" },
        ],
      },
    ],
  },

  "F#": {
    major: [
      {
        id: "f#-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "f#-min",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 3, type: "played" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    "7": [
      {
        id: "f#-7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 4, finger: 4, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "f#-m7",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 4, finger: 3, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 4, finger: 4, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "f#-maj7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "f#-9",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 2, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 1, finger: 3, type: "played" },
        ],
      },
    ],
  },

  G: {
    major: [
      {
        id: "g-maj-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 3, finger: 3, type: "played" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "g-min-1",
        baseFret: 0,
        chordFret: 0,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 3, finger: 3, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "g-7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 3, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "g-m7-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "g-maj7-1",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "g-9-1",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 2, finger: 3, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 4, type: "played" },
        ],
      },
    ],
  },

  "G#": {
    major: [
      {
        id: "g#-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 4, finger: 4, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "g#-min",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 4, finger: 4, type: "played" },
          { string: 0, fret: 2, finger: 2, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "g#-7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 3, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "g#-m7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 4, type: "played" },
          { string: 1, fret: 2, finger: 2, type: "played" },
          { string: 0, fret: 2, finger: 3, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "g#-maj7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 3, finger: 2, type: "played" },
          { string: 0, fret: 3, finger: 2, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "g#-9",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 3, finger: 2, type: "played" },
          { string: 2, fret: 3, finger: 3, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 4, type: "played" },
        ],
      },
    ],
  },

  A: {
    major: [
      {
        id: "a-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    minor: [
      {
        id: "a-min",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 2, type: "played" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    "7": [
      {
        id: "a-7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    m7: [
      {
        id: "a-m7",
        baseFret: 0,
        chordFret: 0,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 0, type: "open" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    maj7: [
      {
        id: "a-maj7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 2, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    9: [
      {
        id: "a-9",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 0, type: "open" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 0, type: "open" },
          { string: 0, fret: 2, finger: 3, type: "played" },
        ],
      },
    ],
  },

  "A#": {
    major: [
      {
        id: "a#-maj",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "a#-min",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "a#-7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "a#-m7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 1, finger: 1, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "a#-maj7",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 3, finger: 3, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 0, type: "open" },
        ],
      },
    ],
    9: [
      {
        id: "a#-9",
        baseFret: 0,
        chordFret: 1,
        fingering: [
          { string: 3, fret: 1, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 2, type: "played" },
          { string: 1, fret: 1, finger: 1, type: "played" },
          { string: 0, fret: 3, finger: 4, type: "played" },
        ],
      },
    ],
  },

  B: {
    major: [
      {
        id: "b-maj",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 4, finger: 3, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    minor: [
      {
        id: "b-min",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 4, finger: 3, type: "played" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    "7": [
      {
        id: "b-7",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    m7: [
      {
        id: "b-m7",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 2, finger: 1, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 2, finger: 1, type: "played" },
        ],
      },
    ],
    maj7: [
      {
        id: "b-maj7",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 4, finger: 3, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 1, finger: 1, type: "played" },
        ],
      },
    ],
    9: [
      {
        id: "b-9",
        baseFret: 0,
        chordFret: 2,
        fingering: [
          { string: 3, fret: 2, finger: 1, type: "played" },
          { string: 2, fret: 3, finger: 2, type: "played" },
          { string: 1, fret: 2, finger: 1, type: "played" },
          { string: 0, fret: 4, finger: 4, type: "played" },
        ],
      },
    ],
  },
};

export const generateUkuleleChord = (
  key: string,
  type: string,
): GeneratedUkuleleChord => {
  // Bemol akorları sharp karşılığına çevir
  const sharpKey = key.replace("b", "#");
  const positions = UKULELE_CHORDS[sharpKey]?.[type] || [];

  if (positions.length === 0) {
    return {
      key: sharpKey,
      type,
      positions: [],
    };
  }

  return {
    key,
    type,
    positions,
  };
};

/** Web kataloğu için mevcut ukulele kök ses → akor tipi haritası */
export const UKULELE_CHORD_MAP: Record<string, string[]> = Object.fromEntries(
  Object.entries(UKULELE_CHORDS).map(([key, types]) => [
    key,
    Object.entries(types)
      .filter(([, positions]) => positions.length > 0)
      .map(([type]) => type),
  ]),
);
