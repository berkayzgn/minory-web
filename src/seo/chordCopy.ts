/**
 * Akor sayfalarının metinlerini üretir.
 *
 * 450+ sayfanın "ince içerik" (thin content) sayılmaması için metinler
 * şablon tekrarı yerine akorun kendi verisinden türetilir: notalar,
 * aralıklar, kaç farklı basış olduğu, barre mi açık pozisyon mu,
 * hangi tonlarda hangi derece olduğu, enharmonik yazımı, TR'de solfej adı.
 *
 * Buradaki hiçbir cümle uydurma bilgi içermez — hepsi akor verisinden
 * ya da müzik teorisinden hesaplanır.
 */

import type { ChordEntry, InstrumentId, Locale } from "../data/chords/catalog";
import { NOTE_SEQUENCE, SOLFEGE, type ChordTypeMeta } from "../data/chords/theory";
import type { FretVoicing, Voicing } from "../data/chords/voicings";

/* ------------------------------------------------------------------ */
/* Küçük yardımcılar                                                   */
/* ------------------------------------------------------------------ */

const transpose = (root: string, semitones: number) =>
  NOTE_SEQUENCE[
    ((NOTE_SEQUENCE as readonly string[]).indexOf(root) + semitones + 12) % 12
  ];

const list = (items: string[], locale: Locale) => {
  if (items.length <= 1) return items.join("");
  const last = items[items.length - 1];
  const rest = items.slice(0, -1).join(", ");
  return locale === "tr" ? `${rest} ve ${last}` : `${rest} and ${last}`;
};

/** TR metinlerde nota adının yanında solfej karşılığı: "A (La)" */
const noteTr = (note: string) => `${note} (${SOLFEGE[note] ?? note})`;

/** Türkçe'de cümle başına gelen enstrüman adı: gitar → Gitar */
const capitalizeTr = (word: string) =>
  word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1);

export function typeLabel(type: ChordTypeMeta, locale: Locale) {
  return locale === "tr" ? type.labelTr : type.labelEn;
}

export function instrumentLabel(instrument: InstrumentId, locale: Locale) {
  const map = {
    guitar: { en: "guitar", tr: "gitar" },
    ukulele: { en: "ukulele", tr: "ukulele" },
    piano: { en: "piano", tr: "piyano" },
  } as const;
  return map[instrument][locale];
}

/* ------------------------------------------------------------------ */
/* Akor tipi açıklamaları — sayfalar arası asıl farklılaşma buradan     */
/* ------------------------------------------------------------------ */

const TYPE_DESCRIPTION: Record<string, Record<Locale, string>> = {
  major: {
    en: "Major chords sound bright and settled. They are built from a root, a major third and a perfect fifth, and they carry most of the resolution points in pop, rock and folk.",
    tr: "Majör akorlar parlak ve yerine oturmuş bir renk verir. Kök ses, majör üçlü ve tam beşliden kurulur; pop, rock ve türkü repertuvarında çözülme noktalarının çoğunu bu akorlar taşır.",
  },
  minor: {
    en: "Minor chords sound darker than major ones because the third is lowered by a semitone. They carry the melancholic colour in most songs and pair naturally with their relative major.",
    tr: "Minör akorlar, üçlü ses yarım perde pes olduğu için majöre göre daha koyu duyulur. Şarkılardaki hüzünlü rengi bu akorlar taşır ve ilgili majör tonuyla doğal olarak eşleşir.",
  },
  "5": {
    en: "Power chords drop the third entirely, leaving only the root and the fifth. Because they are neither major nor minor, they stay clean under high gain and are the backbone of rock and metal riffs.",
    tr: "Power akorlar üçlü sesi tamamen atar; geriye yalnızca kök ses ve beşli kalır. Ne majör ne minör olduğu için yüksek distortion altında bulanmaz ve rock/metal riff'lerinin omurgasıdır.",
  },
  "7": {
    en: "Dominant seventh chords add a minor seventh on top of a major triad. The tension between the third and the seventh is what makes them pull towards the chord a fourth above — the engine of blues and jazz turnarounds.",
    tr: "Dominant yedili akorlar, majör üçlünün üzerine minör yedili ekler. Üçlü ile yedili arasındaki gerilim akoru bir dörtlü yukarıdaki akora doğru çeker; blues ve caz dönüşlerinin motoru budur.",
  },
  maj7: {
    en: "Major seventh chords keep the bright major triad but add the leading tone a semitone below the root. The result is the soft, floating sound heard throughout bossa nova, soul and neo-soul.",
    tr: "Majör yedili akorlar parlak majör üçlüyü korur, üzerine kök sesin yarım perde altındaki sesi ekler. Ortaya çıkan yumuşak ve süzülen renk bossa nova, soul ve neo-soul'un imzasıdır.",
  },
  m7: {
    en: "Minor seventh chords soften the plain minor triad with a minor seventh. They are the standard ii chord in jazz progressions and sit comfortably under vocals in R&B and funk.",
    tr: "Minör yedili akorlar, sade minör üçlüyü minör yedili ile yumuşatır. Caz ilerleyişlerinde standart ii akorudur; R&B ve funk'ta vokalin altında rahatça durur.",
  },
  sus4: {
    en: "Suspended fourth chords replace the third with a fourth, so they sound unresolved on purpose. Releasing the fourth back down to the third is one of the oldest and most satisfying moves in songwriting.",
    tr: "Sus4 akorları üçlü sesin yerine dörtlüyü koyar; bu yüzden bilerek çözülmemiş duyulur. Dörtlüyü tekrar üçlüye indirmek, şarkı yazımının en eski ve en tatmin edici hareketlerinden biridir.",
  },
  add9: {
    en: "Add9 chords keep the full major triad and add the ninth without a seventh. The extra note widens the chord without making it sound jazzy, which is why it is everywhere in modern acoustic pop.",
    tr: "Add9 akorları majör üçlüyü olduğu gibi bırakır ve yedili eklemeden dokuzluyu ekler. Bu ek ses akoru cazlaştırmadan genişletir; modern akustik pop'ta bu kadar sık duyulmasının sebebi budur.",
  },
  sus2: {
    en: "Suspended second chords swap the third for a second, giving an open, airy sound. Guitarists often let one shape ring across several bars because it fits over both major and minor harmony.",
    tr: "Sus2 akorları üçlü sesin yerine ikiliyi koyar; açık ve havadar bir renk verir. Hem majör hem minör armoniye oturduğu için gitaristler tek bir şekli birkaç ölçü boyunca çınlatır.",
  },
  "7sus4": {
    en: "The 7sus4 chord combines the suspended fourth with a minor seventh. It delays resolution while keeping the dominant pull, which makes it a favourite setup chord before a V–I move.",
    tr: "7sus4 akoru, askıda dörtlüyü minör yedili ile birleştirir. Dominant çekimi korurken çözülmeyi geciktirdiği için V–I hareketinden önceki hazırlık akoru olarak sevilir.",
  },
  "7#9": {
    en: "Often called the Hendrix chord, the 7♯9 stacks a sharpened ninth over a dominant seventh. Major and minor thirds sound at once, producing the gritty clash that defines psychedelic rock and funk.",
    tr: "Sıkça Hendrix akoru diye anılan 7♯9, dominant yedilinin üzerine artık dokuzlu yığar. Majör ve minör üçlü aynı anda duyulur; psychedelic rock ve funk'ı tanımlayan o sert sürtüşme buradan gelir.",
  },
  "9": {
    en: "Dominant ninth chords extend the dominant seventh with a ninth on top. They keep the pull of a seventh chord but sound fuller and more coloured, which is why funk and soul rhythm parts lean on them.",
    tr: "Dominant dokuzlu akorlar, dominant yediliyi tepeye dokuzlu ekleyerek genişletir. Yedili akorun çekimini korur ama daha dolu ve renkli duyulur; funk ve soul ritim partilerinin dayandığı ses budur.",
  },
  dim: {
    en: "Diminished triads stack two minor thirds, so both the third and the fifth are lowered. The result is unstable and restless, and it usually appears as a passing chord between two stable ones.",
    tr: "Eksilmiş üçlüler iki minör üçlüyü üst üste koyar; hem üçlü hem beşli pestir. Sonuç dengesiz ve huzursuzdur ve genellikle iki sağlam akor arasında geçiş akoru olarak belirir.",
  },
  dim7: {
    en: "Diminished seventh chords divide the octave into four equal minor thirds. Every inversion sounds the same, so a single shape can be slid up the neck to lead into several different keys.",
    tr: "Eksilmiş yedili akorlar oktavı dört eşit minör üçlüye böler. Her çevrimi aynı duyulduğu için tek bir şekil klavyede kaydırılarak birçok farklı tona giriş yapabilir.",
  },
  "7b5": {
    en: "The 7♭5 chord lowers the fifth of a dominant seventh, thinning out the chord and sharpening its tension. It shows up in jazz and in altered dominant sounds heading towards a resolution.",
    tr: "7♭5 akoru dominant yedilinin beşlisini pesleştirir; akoru inceltir ve gerilimini keskinleştirir. Cazda ve çözülmeye giden alterasyonlu dominant renklerinde karşımıza çıkar.",
  },
  madd9: {
    en: "Minor add9 chords add the ninth to a plain minor triad without a seventh. The added tone brightens the minor colour just enough to keep it open and cinematic rather than sad.",
    tr: "Minör add9 akorları, sade minör üçlüye yedili eklemeden dokuzluyu ekler. Eklenen ses minör rengi tam kararında aydınlatır; hüzünlü değil, açık ve sinematik bir duyum bırakır.",
  },
};

/** Akor tipinin açıklaması — enstrüman sayfasındaki tip rehberi kullanır */
export function typeDescription(typeId: string, locale: Locale): string {
  return TYPE_DESCRIPTION[typeId]?.[locale] ?? "";
}

/* ------------------------------------------------------------------ */
/* Tel / parmak adları                                                 */
/* ------------------------------------------------------------------ */

/** Gitar: veri indeksi 0 = 6. tel (kalın Mi) */
const GUITAR_STRINGS = [
  { number: 6, note: "E" },
  { number: 5, note: "A" },
  { number: 4, note: "D" },
  { number: 3, note: "G" },
  { number: 2, note: "B" },
  { number: 1, note: "E" },
];

/** Ukulele: veri indeksi 0 = 1. tel (A) */
const UKULELE_STRINGS = [
  { number: 1, note: "A" },
  { number: 2, note: "E" },
  { number: 3, note: "C" },
  { number: 4, note: "G" },
];

const FINGER_NAMES: Record<number, Record<Locale, string>> = {
  1: { en: "index finger", tr: "işaret parmağı" },
  2: { en: "middle finger", tr: "orta parmak" },
  3: { en: "ring finger", tr: "yüzük parmağı" },
  4: { en: "little finger", tr: "serçe parmak" },
};

export function stringLabel(
  instrument: InstrumentId,
  index: number,
  locale: Locale,
) {
  const table = instrument === "ukulele" ? UKULELE_STRINGS : GUITAR_STRINGS;
  const s = table[index];
  if (!s) return "";
  return locale === "tr"
    ? `${s.number}. tel (${s.note})`
    : `string ${s.number} (${s.note})`;
}

/**
 * Bir basışı düz metne çevirir — hem ekran okuyucular hem de
 * diyagramı "okuyamayan" arama motorları için.
 */
export function describeVoicing(
  voicing: FretVoicing,
  instrument: InstrumentId,
  locale: Locale,
): string[] {
  const count = instrument === "ukulele" ? 4 : 6;

  // Akor şemaları kalın telden inceye okunur. Veri indeksi gitarda
  // 0 = 6. tel, ukulelede 0 = 1. tel olduğu için yön enstrümana göre değişir.
  const order =
    instrument === "ukulele"
      ? Array.from({ length: count }, (_, i) => count - 1 - i)
      : Array.from({ length: count }, (_, i) => i);

  const lines: string[] = [];

  for (const i of order) {
    const f = voicing.fingering.find((x) => x.string === i);
    const name = stringLabel(instrument, i, locale);
    if (!f || f.type === "none") continue;

    if (f.type === "muted") {
      lines.push(locale === "tr" ? `${name}: çalınmaz` : `${name}: muted`);
    } else if (f.type === "open") {
      lines.push(locale === "tr" ? `${name}: boş çalınır` : `${name}: played open`);
    } else {
      const fret = f.fret + voicing.fretOffset;
      const finger = f.finger ? FINGER_NAMES[f.finger]?.[locale] : undefined;
      lines.push(
        locale === "tr"
          ? `${name}: ${fret}. perde${finger ? ` — ${finger}` : ""}`
          : `${name}: fret ${fret}${finger ? ` — ${finger}` : ""}`,
      );
    }
  }

  return lines;
}

/* ------------------------------------------------------------------ */
/* Sayfa metinleri                                                     */
/* ------------------------------------------------------------------ */

export interface ChordPageCopy {
  h1: string;
  intro: string;
  theory: string;
  howToPlay: string;
  faq: { q: string; a: string }[];
}

function notesSentence(entry: ChordEntry, locale: Locale): string {
  const notes =
    locale === "tr" ? entry.notes.map(noteTr) : entry.notes.slice();
  return list(notes, locale);
}

/**
 * Akorun hangi tonlarda hangi derece olduğunu anlatır.
 * Yalnızca majör ve minör için üretilir; diğer tipler için boş döner.
 */
function harmonicContext(entry: ChordEntry, locale: Locale): string {
  const r = entry.root;
  if (entry.type.id === "major") {
    const iv = transpose(r, -5);
    const v = transpose(r, -7);
    const rel = transpose(r, -3);
    return locale === "tr"
      ? `${entry.name} akoru ${r} majör tonunun I. derecesi, ${iv} majörün V. derecesi ve ${v} majörün IV. derecesidir. İlgili minörü ${rel}m akorudur; ikisi aynı ses malzemesini paylaşır.`
      : `${entry.name} is the I chord in the key of ${r} major, the V chord in ${iv} major and the IV chord in ${v} major. Its relative minor is ${rel}m, which shares the same set of notes.`;
  }
  if (entry.type.id === "minor") {
    const relMajor = transpose(r, 3);
    const ii = transpose(r, -2);
    const iii = transpose(r, -4);
    return locale === "tr"
      ? `${entry.name} akoru ${relMajor} majör tonunun vi. derecesi, ${ii} majörün ii. derecesi ve ${iii} majörün iii. derecesidir. İlgili majörü ${relMajor} akorudur.`
      : `${entry.name} is the vi chord in the key of ${relMajor} major, the ii chord in ${ii} major and the iii chord in ${iii} major. Its relative major is ${relMajor}.`;
  }
  return "";
}

function progressionSentence(entry: ChordEntry, locale: Locale): string {
  const r = entry.root;
  if (entry.type.id === "major") {
    const four = transpose(r, 5);
    const five = transpose(r, 7);
    const six = transpose(r, 9);
    return locale === "tr"
      ? `En sık kullanıldığı ilerleyiş ${r} – ${six}m – ${four} – ${five} dizilimidir.`
      : `The most common progression it appears in is ${r} – ${six}m – ${four} – ${five}.`;
  }
  if (entry.type.id === "minor") {
    const relMajor = transpose(r, 3);
    const four = transpose(r, 8);
    const five = transpose(r, 10);
    return locale === "tr"
      ? `Sıkça ${entry.name} – ${four} – ${relMajor} – ${five} ilerleyişinde duyulur.`
      : `It is often heard in the ${entry.name} – ${four} – ${relMajor} – ${five} progression.`;
  }
  return "";
}

export function chordPageCopy(
  entry: ChordEntry,
  voicings: Voicing[],
  locale: Locale,
): ChordPageCopy {
  const inst = instrumentLabel(entry.instrument, locale);
  const tLabel = typeLabel(entry.type, locale);
  const notes = notesSentence(entry, locale);
  const typeDesc = TYPE_DESCRIPTION[entry.type.id]?.[locale] ?? "";
  const count = voicings.length;

  const fretVoicings = voicings.filter(
    (v): v is FretVoicing => v.kind === "fret",
  );
  const openCount = fretVoicings.filter(
    (v) => v.hasOpenStrings && !v.isBarre,
  ).length;
  const barreCount = fretVoicings.filter((v) => v.isBarre).length;
  const lowestFret = fretVoicings.length
    ? Math.min(...fretVoicings.map((v) => v.chordFret ?? v.baseFret + 1))
    : 0;

  const altName =
    entry.altName &&
    (locale === "tr"
      ? `Bu akor ${entry.altName} olarak da yazılır — aynı sesleri verir.`
      : `The same chord is also written ${entry.altName}; both spellings sound identical.`);

  /* --- H1 --- */
  const h1 =
    locale === "tr"
      ? `${entry.name} Akoru — ${inst.charAt(0).toUpperCase()}${inst.slice(1)}`
      : `${entry.name} Chord on ${inst.charAt(0).toUpperCase()}${inst.slice(1)}`;

  /* --- Giriş --- */
  const trSolfege = SOLFEGE[entry.root];
  const intro =
    locale === "tr"
      ? [
          `${entry.name} akoru (${trSolfege} ${tLabel}) ${notes} notalarından oluşur.`,
          entry.instrument === "piano"
            ? `Aşağıdaki klavye diyagramında akorun hangi tuşlara denk geldiğini görebilirsiniz.`
            : count === 1
              ? `${capitalizeTr(inst)} için basış diyagramı aşağıda.`
              : `${capitalizeTr(inst)} için ${count} farklı basış diyagramı aşağıda listelendi.`,
          altName || "",
        ]
          .filter(Boolean)
          .join(" ")
      : [
          `The ${entry.name} chord (${entry.root} ${tLabel}) is built from the notes ${notes}.`,
          entry.instrument === "piano"
            ? `The keyboard diagram below shows exactly which keys to press.`
            : count === 1
              ? `The ${inst} fingering for it is shown below.`
              : `${count} different ${inst} fingerings for it are shown below.`,
          altName || "",
        ]
          .filter(Boolean)
          .join(" ");

  /* --- Teori --- */
  const degrees = entry.type.degrees.join(" – ");
  const theory =
    locale === "tr"
      ? `${typeDesc} ${entry.name} akorunda bu yapı ${entry.root} kök sesi üzerine kurulur ve ${degrees} dereceleri ${notes} notalarına denk gelir. ${harmonicContext(entry, locale)} ${progressionSentence(entry, locale)}`.trim()
      : `${typeDesc} On ${entry.name} this structure sits on the root ${entry.root}, so the degrees ${degrees} map onto ${notes}. ${harmonicContext(entry, locale)} ${progressionSentence(entry, locale)}`.trim();

  /* --- Nasıl çalınır --- */
  let howToPlay: string;
  if (entry.instrument === "piano") {
    howToPlay =
      locale === "tr"
        ? `Piyanoda ${entry.name} akorunu çalmak için ${notes} tuşlarına aynı anda basın. Kök pozisyonda en pes ses ${noteTr(entry.root)} olur; parmak numaraları diyagramdaki soldan sağa sırayı izler.`
        : `To play ${entry.name} on piano, press ${notes} together. In root position the lowest note is ${entry.root}, and the finger numbers follow the keys left to right in the diagram.`;
  } else if (barreCount > 0 && openCount === 0) {
    howToPlay =
      locale === "tr"
        ? `${entry.name} akorunun ${inst} üzerindeki basışlarının tamamı barre gerektirir; en düşük pozisyon ${lowestFret}. perdede başlar. İşaret parmağınızı perde teline mümkün olduğunca yakın ve düz tutun, baskıyı bileğinizden verin.`
        : `Every ${inst} shape for ${entry.name} needs a barre, and the lowest one starts at fret ${lowestFret}. Keep the index finger straight and as close to the fret wire as possible, and let the wrist rather than the thumb supply the pressure.`;
  } else if (openCount > 0 && barreCount > 0) {
    howToPlay =
      locale === "tr"
        ? `${entry.name} akorunun ${openCount} açık pozisyonu ve ${barreCount} barre basışı var. Yeni başlıyorsanız açık pozisyonla çalışın; barre şekilleri aynı akoru klavyenin üst bölgesine taşımak ve tonu değiştirmeden renk almak için kullanılır.`
        : `${entry.name} has ${openCount} open position${openCount === 1 ? "" : "s"} and ${barreCount} barre shape${barreCount === 1 ? "" : "s"}. Start with the open voicing if you are new to it; the barre shapes exist to move the same chord further up the neck without changing the key.`;
  } else {
    howToPlay =
      locale === "tr"
        ? `${entry.name} akoru ${inst} üzerinde açık tellerle çalınabilir, bu yüzden yeni başlayanlar için erişilebilir bir akordur. Diyagramdaki ○ işaretli teller boş çalınır, ✕ işaretli teller ise susturulur.`
        : `${entry.name} can be played with open strings on ${inst}, which makes it an accessible shape for beginners. Strings marked ○ ring open, while strings marked ✕ are muted.`;
  }

  /* --- SSS --- */
  const faq: { q: string; a: string }[] = [];

  faq.push(
    locale === "tr"
      ? {
          q: `${entry.name} akoru hangi notalardan oluşur?`,
          a: `${entry.name} akoru ${notes} notalarından oluşur. Bu notalar kök sese göre ${degrees} derecelerine karşılık gelir.`,
        }
      : {
          q: `Which notes are in the ${entry.name} chord?`,
          a: `${entry.name} contains the notes ${notes}. Relative to the root these are the degrees ${degrees}.`,
        },
  );

  if (entry.instrument !== "piano") {
    faq.push(
      locale === "tr"
        ? {
            q: `${entry.name} akorunun kaç farklı basışı var?`,
            a:
              count === 1
                ? `Minory'de ${entry.name} akoru için ${inst} üzerinde tek bir basış bulunuyor${barreCount > 0 ? " ve bu bir barre pozisyonu" : ""}.`
                : `Minory'de ${entry.name} akoru için ${inst} üzerinde ${count} farklı basış bulunuyor${barreCount > 0 ? `; bunların ${barreCount} tanesi barre pozisyonu` : ""}. Hepsi aynı akoru verir, farklı olan tını ve klavyedeki konumdur.`,
          }
        : {
            q: `How many ways can you play ${entry.name}?`,
            a:
              count === 1
                ? `Minory lists a single ${inst} fingering for ${entry.name}${barreCount > 0 ? ", and it is a barre shape" : ""}.`
                : `Minory lists ${count} ${inst} fingerings for ${entry.name}${barreCount > 0 ? `, ${barreCount} of which ${barreCount === 1 ? "is a barre shape" : "are barre shapes"}` : ""}. They all produce the same chord — what changes is the voicing and where it sits on the neck.`,
          },
    );

    faq.push(
      locale === "tr"
        ? {
            q: `${entry.name} akoru zor mu?`,
            a:
              openCount > 0
                ? `Hayır. ${entry.name} akorunun açık pozisyonu boş telleri kullanır ve barre gerektirmez, bu yüzden yeni başlayanların öğrenebileceği bir akordur.`
                : `${entry.name} akoru barre gerektirdiği için ilk aşamada zorlayıcı olabilir. İşaret parmağını düz tutmak ve baskıyı bilekten vermek zorluğu belirgin biçimde azaltır.`,
          }
        : {
            q: `Is the ${entry.name} chord hard to play?`,
            a:
              openCount > 0
                ? `Not really. The open position of ${entry.name} uses open strings and needs no barre, which makes it approachable for beginners.`
                : `${entry.name} requires a barre, so it can feel demanding at first. Keeping the index finger straight and pressing from the wrist rather than the thumb makes it noticeably easier.`,
          },
    );
  }

  if (entry.altName) {
    faq.push(
      locale === "tr"
        ? {
            q: `${entry.name} ile ${entry.altName} aynı akor mu?`,
            a: `Evet. ${entry.name} ve ${entry.altName} enharmonik olarak aynı akordur; yazımları farklıdır ama aynı tuşlara ve aynı perdelere basılır. Hangi yazımın kullanıldığı parçanın tonuna bağlıdır.`,
          }
        : {
            q: `Are ${entry.name} and ${entry.altName} the same chord?`,
            a: `Yes. ${entry.name} and ${entry.altName} are enharmonically identical — the spelling differs but the frets and keys are the same. Which name is used depends on the key of the piece.`,
          },
    );
  }

  return { h1, intro, theory, howToPlay, faq };
}
