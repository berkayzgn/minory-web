import type { Voicing } from "../../data/chords/voicings";
import { GuitarNeck } from "./GuitarNeck";
import { PianoKeyboard } from "./PianoKeyboard";
import { UkuleleNeck } from "./UkuleleNeck";

interface ChordDiagramProps {
  instrument: "guitar" | "ukulele" | "piano";
  voicing: Voicing;
  /** SVG <title> — ekran okuyucular ve görsel arama için */
  title: string;
}

/** Enstrümana göre doğru diyagramı çizen ince sarmalayıcı */
export function ChordDiagram({ instrument, voicing, title }: ChordDiagramProps) {
  if (voicing.kind === "piano") {
    return <PianoKeyboard pressedKeys={voicing.keys} title={title} />;
  }

  const Neck = instrument === "ukulele" ? UkuleleNeck : GuitarNeck;
  return (
    <Neck
      fingers={voicing.fingering}
      baseFret={voicing.baseFret}
      chordFret={voicing.chordFret}
      title={title}
    />
  );
}
