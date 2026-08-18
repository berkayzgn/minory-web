import type { ChordFinger } from "../../data/chords/types";
import { DIAGRAM_COLORS as C, findBarres } from "./diagramTheme";

interface UkuleleNeckProps {
  fingers: ChordFinger[];
  baseFret?: number;
  chordFret?: number;
  title: string;
}

/**
 * Ukulele akor diyagramı — uygulamadaki
 * `shared/components/UkuleleNeck.tsx` bileşeninin web SVG karşılığı.
 * Tel sırası: 0 = A, 1 = E, 2 = C, 3 = G (üstten aşağıya).
 */
export function UkuleleNeck({
  fingers,
  baseFret = 0,
  chordFret,
  title,
}: UkuleleNeckProps) {
  const nutX = 270;
  const endX = 45;
  const startY = 25;
  const endY = 175;
  const fretSpacing = 46;

  const fretPositions = Array.from(
    { length: 6 },
    (_, i) => nutX - fretSpacing * i,
  );

  const stringPositions = [165, 120, 75, 30];
  const circleRadius = 14;

  const getFretCenterX = (fret: number) =>
    fret === 0 ? nutX + 20 : (fretPositions[fret - 1] + fretPositions[fret]) / 2;
  const getStringY = (string: number) => stringPositions[string];

  const barres = findBarres(fingers);

  return (
    <svg
      viewBox="20 -30 280 200"
      role="img"
      aria-label={title}
      className="w-full h-auto"
    >
      <title>{title}</title>
      <g transform="translate(0 -20)">
        <rect
          x={endX}
          y={startY - 10}
          width={nutX - endX}
          height={endY - startY + 20}
          fill={C.fretboard}
          rx="4"
        />

        <line
          x1={nutX}
          y1={startY}
          x2={nutX}
          y2={endY}
          stroke={C.nut}
          strokeWidth={baseFret === 0 ? 6 : 2}
        />

        {fretPositions
          .slice(1)
          .filter((x) => x > endX + 2)
          .map((x, i) => (
            <line
              key={`fret-${i}`}
              x1={x}
              y1={startY - 10}
              x2={x}
              y2={endY + 10}
              stroke={C.fretWire}
              strokeWidth="2"
            />
          ))}

        {stringPositions.map((y, i) => {
          const isMuted = fingers.some(
            (f) => f.string === i && f.type === "muted",
          );
          return (
            <line
              key={`string-${i}`}
              x1={endX}
              y1={y}
              x2={nutX}
              y2={y}
              stroke={isMuted ? C.muted : C.string}
              strokeWidth="3.5"
            />
          );
        })}

        {barres.map((barre, i) => {
          const x = getFretCenterX(barre.fret);
          const yA = getStringY(barre.maxString);
          const yB = getStringY(barre.minString);
          const topY = Math.min(yA, yB);
          const bottomY = Math.max(yA, yB);
          const padding = 16;

          return (
            <g key={`barre-${i}`}>
              <rect
                x={x - (circleRadius * 1.8) / 2}
                y={topY - padding}
                width={circleRadius * 1.8}
                height={bottomY - topY + padding * 2}
                fill={C.accent}
                stroke={C.onAccent}
                strokeWidth={2}
                rx={12}
                ry={12}
              />
              <text
                x={x}
                y={(topY + bottomY) / 2}
                fontSize={14}
                fontWeight="bold"
                fill={C.onAccent}
                textAnchor="middle"
                dy="0.35em"
              >
                {barre.finger}
              </text>
            </g>
          );
        })}

        {fingers.map((finger, i) => {
          const x = getFretCenterX(finger.fret);
          const y = getStringY(finger.string);

          const isPartOfBarre = barres.some(
            (barre) =>
              finger.fret === barre.fret &&
              finger.finger === barre.finger &&
              finger.type === "played",
          );
          if (isPartOfBarre || finger.type === "none") return null;

          if (finger.type === "open") {
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={5}
                fill="none"
                stroke={C.accent}
                strokeWidth="2"
              />
            );
          }

          if (finger.type === "muted") {
            const o = 6;
            return (
              <g key={i} opacity="0.7">
                <line
                  x1={x - o}
                  y1={y - o}
                  x2={x + o}
                  y2={y + o}
                  stroke={C.muted}
                  strokeWidth="2"
                />
                <line
                  x1={x - o}
                  y1={y + o}
                  x2={x + o}
                  y2={y - o}
                  stroke={C.muted}
                  strokeWidth="2"
                />
              </g>
            );
          }

          return (
            <g key={i}>
              <circle
                cx={x}
                cy={y}
                r={circleRadius}
                fill={C.accent}
                stroke={C.onAccent}
                strokeWidth="1"
              />
              {finger.finger && (
                <text
                  x={x}
                  y={y}
                  fontSize={14}
                  fontWeight="bold"
                  fill={C.onAccent}
                  textAnchor="middle"
                  dy="0.35em"
                >
                  {finger.finger}
                </text>
              )}
            </g>
          );
        })}

        {chordFret !== undefined &&
          (() => {
            const playedFingers = fingers.filter(
              (f) => f.type === "played" && f.finger,
            );
            if (playedFingers.length === 0) return null;

            const minFinger = Math.min(...playedFingers.map((f) => f.finger!));
            const anchor = playedFingers.find((f) => f.finger === minFinger);
            if (!anchor) return null;

            return (
              <text
                x={getFretCenterX(anchor.fret)}
                y={startY - 25}
                dy="-0.15em"
                fontSize={16}
                fontWeight="bold"
                fill={C.fretLabel}
                textAnchor="middle"
              >
                {chordFret}
              </text>
            );
          })()}
      </g>
    </svg>
  );
}
