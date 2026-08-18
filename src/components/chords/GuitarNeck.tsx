import type { ChordFinger } from "../../data/chords/types";
import { DIAGRAM_COLORS as C, findBarres } from "./diagramTheme";

interface GuitarNeckProps {
  fingers: ChordFinger[];
  baseFret?: number;
  chordFret?: number;
  /** Ekran okuyucu ve görsel arama için diyagram açıklaması */
  title: string;
}

/**
 * Gitar akor diyagramı.
 *
 * Minory uygulamasındaki `shared/components/GuitarNeck.tsx` (react-native-svg)
 * bileşeninin web SVG karşılığı — geometri, perde aralıkları ve barre
 * mantığı birebir aynı tutuldu.
 */
export function GuitarNeck({
  fingers,
  baseFret = 0,
  chordFret,
  title,
}: GuitarNeckProps) {
  const nutX = 280;
  const endX = 40;
  const startY = 20;
  const endY = 180;
  const fretSpacing = 48;

  const fretPositions = Array.from(
    { length: 6 },
    (_, i) => nutX - fretSpacing * i,
  );

  /** 0 = kalın Mi, 5 = ince Mi (yukarıdan aşağıya) */
  const stringPositions = [180, 147, 114, 81, 48, 15];
  const circleRadius = 15;

  const getFretCenterX = (fret: number) =>
    fret === 0 ? nutX + 20 : (fretPositions[fret - 1] + fretPositions[fret]) / 2;
  const getStringY = (string: number) => stringPositions[5 - string];

  const barres = findBarres(fingers);

  return (
    <svg
      viewBox="20 -10 300 230"
      role="img"
      aria-label={title}
      className="w-full h-auto"
    >
      <title>{title}</title>
      <g transform="translate(0 12)">
        {/* Klavye zemini */}
        <rect
          x={endX}
          y={startY - 10}
          width={nutX - endX}
          height={endY - startY + 20}
          fill={C.fretboard}
          rx="4"
        />

        {/* Üst eşik (nut) ya da normal perde teli */}
        <line
          x1={nutX}
          y1={startY}
          x2={nutX}
          y2={endY}
          stroke={C.nut}
          strokeWidth={baseFret === 0 ? 6 : 2}
        />

        {/* Perde telleri */}
        {fretPositions.slice(1).map((x, i) => (
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

        {/* Teller */}
        {stringPositions.map((y, i) => {
          const isMuted = fingers.some(
            (f) => f.string === 5 - i && f.type === "muted",
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

        {/* Barreler */}
        {barres.map((barre, i) => {
          const x = getFretCenterX(barre.fret);
          const minY = getStringY(barre.maxString);
          const maxY = getStringY(barre.minString);
          const padding = 8;
          const midY = (minY + maxY) / 2;

          return (
            <g key={`barre-${i}`}>
              <rect
                x={x - (circleRadius * 1.8) / 2}
                y={maxY - padding}
                width={circleRadius * 1.8}
                height={minY - maxY + padding * 2}
                fill={C.accent}
                stroke={C.onAccent}
                strokeWidth={2}
                rx={12}
                ry={12}
              />
              <text
                x={x}
                y={midY}
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

        {/* Parmaklar */}
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

        {/* Akorun başladığı perde numarası */}
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
