import type { PianoKeyPress } from "../../data/chords/types";
import { DIAGRAM_COLORS as C } from "./diagramTheme";

interface PianoKeyboardProps {
  pressedKeys: PianoKeyPress[];
  title: string;
}

const WHITE_NOTE_SEQUENCE = ["C", "D", "E", "F", "G", "A", "B"];
const BLACK_ABOVE: Record<string, string | null> = {
  C: "C#",
  D: "D#",
  E: null,
  F: "F#",
  G: "G#",
  A: "A#",
  B: null,
};

const WHITE_KEY_WIDTH = 32;
const WHITE_KEY_HEIGHT = 200;
const BLACK_KEY_WIDTH = 22;
const BLACK_KEY_HEIGHT = 130;
/** 3 oktav — uygulamadaki klavye aralığıyla aynı (C0 → B2) */
const WHITE_KEY_COUNT = 21;

const displayNote = (note: string) => note.replace(/#/g, "♯");

/**
 * Piyano akor diyagramı — uygulamadaki
 * `shared/components/PianoKeyboard.tsx` bileşeninin web SVG karşılığı.
 *
 * Mobilde klavye yatay kaydırılıp basılan tuşlar ortalanıyor; web'de
 * kaydırma yerine viewBox basılan tuşların çevresine kırpılıyor,
 * böylece diyagram tek bakışta okunuyor.
 */
export function PianoKeyboard({ pressedKeys, title }: PianoKeyboardProps) {
  const pressedMap = new Map(
    pressedKeys.map((k) => [`${k.note}${k.octave ?? 0}`, k]),
  );

  const whiteKeys = Array.from({ length: WHITE_KEY_COUNT }, (_, i) => {
    const note = WHITE_NOTE_SEQUENCE[i % 7];
    const octave = Math.floor(i / 7);
    const id = `${note}${octave}`;
    return {
      id,
      note,
      x: i * WHITE_KEY_WIDTH,
      width: WHITE_KEY_WIDTH,
      pressed: pressedMap.get(id),
    };
  });

  const blackKeys = Array.from({ length: WHITE_KEY_COUNT }, (_, i) => i)
    .map((i) => {
      const whiteNote = WHITE_NOTE_SEQUENCE[i % 7];
      const blackNote = BLACK_ABOVE[whiteNote];
      if (!blackNote || i + 1 >= WHITE_KEY_COUNT) return null;
      const octave = Math.floor(i / 7);
      const id = `${blackNote}${octave}`;
      return {
        id,
        note: blackNote,
        x: i * WHITE_KEY_WIDTH + WHITE_KEY_WIDTH - BLACK_KEY_WIDTH / 2,
        width: BLACK_KEY_WIDTH,
        pressed: pressedMap.get(id),
      };
    })
    .filter((k): k is NonNullable<typeof k> => k !== null);

  // Basılan tuşların çevresine kırp: kaydırma çubuğu olmadan okunur kalsın
  const pressed = [...whiteKeys, ...blackKeys].filter((k) => k.pressed);
  const fullWidth = WHITE_KEY_COUNT * WHITE_KEY_WIDTH;

  let viewX = 0;
  let viewWidth = fullWidth;
  if (pressed.length > 0) {
    const minX = Math.min(...pressed.map((k) => k.x));
    const maxX = Math.max(...pressed.map((k) => k.x + k.width));
    const padding = WHITE_KEY_WIDTH * 1.5;
    // En az 9 beyaz tuş göster ki dar akorlar aşırı yakınlaşmasın
    const minWindow = WHITE_KEY_WIDTH * 9;
    const desired = Math.max(maxX - minX + padding * 2, minWindow);
    const center = (minX + maxX) / 2;
    viewWidth = Math.min(desired, fullWidth);
    viewX = Math.max(0, Math.min(center - viewWidth / 2, fullWidth - viewWidth));
  }

  return (
    <svg
      viewBox={`${viewX} 0 ${viewWidth} ${WHITE_KEY_HEIGHT + 4}`}
      role="img"
      aria-label={title}
      className="w-full h-auto"
    >
      <title>{title}</title>

      {whiteKeys.map((key) => (
        <rect
          key={key.id}
          x={key.x}
          y={0}
          width={WHITE_KEY_WIDTH}
          height={WHITE_KEY_HEIGHT}
          fill={key.pressed ? C.accent : C.whiteKey}
          stroke={C.keyStroke}
          strokeWidth={1}
        />
      ))}

      {blackKeys.map((key) => (
        <rect
          key={key.id}
          x={key.x}
          y={0}
          width={BLACK_KEY_WIDTH}
          height={BLACK_KEY_HEIGHT}
          fill={key.pressed ? C.accent : C.blackKey}
          stroke={C.keyStroke}
          strokeWidth={1}
          rx={4}
        />
      ))}

      {/* Basılan tuşların nota adı — web'e özel okunabilirlik eklentisi */}
      {whiteKeys
        .filter((k) => k.pressed)
        .map((key) => (
          <text
            key={`label-${key.id}`}
            x={key.x + WHITE_KEY_WIDTH / 2}
            y={WHITE_KEY_HEIGHT - 16}
            fontSize={13}
            fontWeight="bold"
            fill={C.onAccent}
            textAnchor="middle"
          >
            {displayNote(key.note)}
          </text>
        ))}

      {blackKeys
        .filter((k) => k.pressed)
        .map((key) => (
          <text
            key={`label-${key.id}`}
            x={key.x + BLACK_KEY_WIDTH / 2}
            y={BLACK_KEY_HEIGHT - 12}
            fontSize={11}
            fontWeight="bold"
            fill={C.onAccent}
            textAnchor="middle"
          >
            {displayNote(key.note)}
          </text>
        ))}
    </svg>
  );
}
