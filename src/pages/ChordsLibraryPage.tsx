import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function ChordsLibraryPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col">
      <Navbar />
      <section className="relative flex-grow flex items-center py-24 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 dark:bg-indigo-500/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: iPhone mockup - Chord Library app */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl scale-90 translate-y-8 -z-10 opacity-60" />
              <div className="relative mx-auto border-neutral-800 bg-neutral-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-soft-xl">
                <div className="h-[32px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[72px] rounded-l-lg" />
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[178px] rounded-l-lg" />
                <div className="h-[64px] w-[3px] bg-neutral-800 absolute -right-[17px] top-[142px] rounded-r-lg" />

                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background-dark relative flex flex-col">
                  <div className="pt-12 px-6 flex justify-between items-center z-10">
                    <span className="material-icons-round text-white/60 text-sm">menu</span>
                    <span className="text-white text-sm font-semibold tracking-wide">CHORDS</span>
                    <span className="material-icons-round text-white/60 text-sm">settings</span>
                  </div>

                  {/* Search */}
                  <div className="px-4 pt-2 pb-4">
                    <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10">
                      <span className="material-icons-round text-white/40 text-lg">search</span>
                      <span className="text-white/60 text-sm">Cmaj7, F#m...</span>
                    </div>
                  </div>

                  {/* Chord list + diagram area */}
                  <div className="flex-1 overflow-hidden flex flex-col px-4">
                    <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar">
                      {["All", "Major", "Minor", "7th"].map((label, i) => (
                        <span
                          key={label}
                          className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium ${
                            i === 0 ? "bg-primary text-white" : "bg-white/5 text-white/70"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-2 flex-1 min-h-0">
                      {["Am7", "Dm7", "Gmaj7", "Em7", "Cadd9"].map((chord, i) => (
                        <div
                          key={chord}
                          className={`flex items-center justify-between py-2.5 px-3 rounded-xl ${
                            i === 1 ? "bg-primary/20 border border-primary/30" : "bg-white/5"
                          }`}
                        >
                          <span className="font-mono font-bold text-white">{chord}</span>
                          <span className="text-white/50 text-xs">Guitar, Piano</span>
                        </div>
                      ))}
                    </div>
                    {/* Chord diagram preview */}
                    <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono font-bold text-primary text-sm">Am7</span>
                        <span className="text-white/40 text-[10px]">Position 1</span>
                      </div>
                      <div className="relative h-16 rounded-lg bg-white/5 border border-white/10">
                        <div className="absolute inset-0 grid grid-cols-4">
                          {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="border-r border-white/10 last:border-r-0 flex flex-col">
                              {[0, 1, 2, 3].map((f) => (
                                <div key={f} className="flex-1 border-b border-white/10 last:border-b-0" />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-[15%] left-[12%] w-2 h-2 bg-primary rounded-full" />
                        <div className="absolute top-[40%] left-[37%] w-2 h-2 bg-primary rounded-full" />
                        <div className="absolute top-[40%] left-[62%] w-2 h-2 bg-primary rounded-full" />
                        <div className="absolute top-[40%] left-[87%] w-2 h-2 bg-primary rounded-full" />
                      </div>
                    </div>
                  </div>

                  <div className="pb-6 px-4">
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/30"
                    >
                      <span className="material-icons-round text-lg">library_music</span>
                      Browse Library
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2rem]" />
                </div>
              </div>
            </div>

            {/* Right: Text content */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-8">
              <div>
                <div className="inline-flex items-center space-x-2 bg-primary/5 dark:bg-primary/20 px-3 py-1 rounded-full mb-6">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary tracking-widest uppercase">Studio Tools</span>
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 dark:text-white leading-[1.1] mb-6">
                  Every Voicing.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">One Library.</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                  From jazz voicings to pop progressions—search, discover, and practice thousands of chord shapes. Guitar, piano, and ukulele fingerings with alternate positions and clear diagrams.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">library_music</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">2,000+ Voicings</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Accurate chord library for jazz, pop, rock, and classical. Multiple positions per chord.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">offline_bolt</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Full Offline Access</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Download the library once. Use it anywhere—rehearsal, stage, or practice room—no connection needed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-8 py-4 rounded-xl font-bold transition-colors hover:opacity-90"
                >
                  Download Now
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </a>
                <Link
                  to="/#feature-chords"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl text-neutral-600 dark:text-neutral-300 font-semibold hover:text-primary dark:hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary"
                >
                  See how it works
                  <span className="material-icons-round text-sm text-primary">play_circle</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-24 pt-12 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">
                2,000<span className="text-primary text-xl ml-1">+</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Voicings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">
                3
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Instruments</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">
                Offline
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Full Library</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">12+</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Chord Types</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
