import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function RepertoirePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col selection:bg-primary/30 selection:text-primary">
      <Navbar />
      <section className="relative w-full py-24 lg:py-32 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            {/* Left: Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2">
                  <span className="w-8 h-[2px] bg-primary rounded-full" />
                  <span className="text-primary font-bold tracking-widest text-sm uppercase">Professional Tools</span>
                </div>
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-neutral-900 dark:text-white leading-[1.1]">
                  Precision Chords.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Infinite Repertoire.</span>
                </h2>
                <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-xl">
                  The ultimate companion for session musicians and band leaders. Say goodbye to messy binders. Minory Studio renders your lyrics and chords with typographic precision.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {[
                  { title: "2,000+ Voicings", desc: "Accurate library for jazz, pop & rock." },
                  { title: "Smart Auto-Scroll", desc: "Syncs perfectly with your BPM." },
                  { title: "Setlist Manager", desc: "Drag, drop, and organize instantly." },
                  { title: "Offline Mode", desc: "Perform anywhere, no signal needed." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="material-icons-round text-primary text-sm font-bold">check</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                      <p className="text-sm text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Link
                  to="/#feature-repertoire"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-primary border border-transparent rounded-xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/25 transition-colors"
                >
                  Explore Library
                  <span className="material-icons-round ml-2 text-xl">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Phone mockup + floating card */}
            <div className="w-full lg:w-1/2 relative order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-60 scale-75 -z-10" />

              <div className="relative w-[320px] sm:w-[360px] h-[700px] bg-neutral-900 rounded-[3rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] border-[8px] border-neutral-900 overflow-hidden ring-1 ring-white/10 z-10">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-7 bg-neutral-900 rounded-b-3xl z-20 flex justify-center">
                  <div className="w-24 h-5 bg-black rounded-b-xl mt-1" />
                </div>

                <div className="w-full h-full bg-white dark:bg-neutral-900 flex flex-col relative overflow-hidden">
                  <div className="pt-12 pb-4 px-6 flex items-center justify-between bg-white dark:bg-neutral-900 z-10">
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-icons-round text-neutral-600 dark:text-neutral-300 text-sm">chevron_left</span>
                    </div>
                    <div className="text-center">
                      <h3 className="font-bold text-neutral-900 dark:text-white text-sm">Neon Horizon</h3>
                      <span className="text-xs text-primary font-medium">Minory Band</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                      <span className="material-icons-round text-neutral-600 dark:text-neutral-300 text-sm">more_horiz</span>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex items-center space-x-4 border-b border-neutral-100 dark:border-neutral-800">
                    <div className="px-3 py-1 rounded bg-primary/10 text-primary text-xs font-bold font-mono">124 BPM</div>
                    <div className="px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-bold font-mono">Key: Am</div>
                    <div className="px-3 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-bold font-mono">4/4</div>
                  </div>

                  <div className="flex-1 overflow-hidden relative px-6 py-6 bg-white dark:bg-neutral-900">
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white dark:from-neutral-900 to-transparent z-10" />
                    <div className="space-y-8 font-mono text-sm leading-relaxed">
                      <div>
                        <div className="text-primary font-bold mb-1">
                          <span className="inline-block w-[7ch]">Am9</span>
                          <span className="inline-block w-[7ch]">Em7</span>
                          <span className="inline-block w-[7ch]">Fmaj7</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">Walking down the street, lights are fading low</p>
                      </div>
                      <div>
                        <div className="text-primary font-bold mb-1">
                          <span className="inline-block w-[7ch]">Dm7</span>
                          <span className="inline-block w-[7ch]">G13</span>
                          <span className="inline-block w-[7ch]">Cmaj7</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">Shadows dance around, nowhere left to go</p>
                      </div>
                      <div className="pt-4">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans font-bold block mb-2">Chorus</span>
                        <div className="p-2 -mx-2 rounded bg-primary/5 border-l-2 border-primary">
                          <div className="text-primary font-bold mb-1">
                            <span className="inline-block w-[7ch]">F#m7b5</span>
                            <span className="inline-block w-[7ch]">B7alt</span>
                            <span className="inline-block w-[7ch]">Em9</span>
                          </div>
                          <p className="text-neutral-900 dark:text-white font-medium">I can see the neon horizon calling me</p>
                        </div>
                      </div>
                      <div>
                        <div className="text-primary font-bold mb-1">
                          <span className="inline-block w-[7ch]">Am7</span>
                          <span className="inline-block w-[7ch]">D9</span>
                          <span className="inline-block w-[7ch]">Gmaj7</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">Breaking through the night, wild and free</p>
                      </div>
                      <div className="opacity-50">
                        <div className="text-primary font-bold mb-1">
                          <span className="inline-block w-[7ch]">Cmaj7</span>
                          <span className="inline-block w-[7ch]">Fmaj7</span>
                        </div>
                        <p className="text-neutral-700 dark:text-neutral-300">Take my hand and run...</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-900 via-white/80 dark:via-neutral-900/80 to-transparent z-10 pointer-events-none" />
                  </div>

                  <div className="h-20 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between px-6 z-20">
                    <span className="material-icons-round text-neutral-400">tune</span>
                    <div className="flex items-center space-x-6">
                      <span className="material-icons-round text-neutral-800 dark:text-white text-2xl">skip_previous</span>
                      <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                        <span className="material-icons-round text-2xl">play_arrow</span>
                      </div>
                      <span className="material-icons-round text-neutral-800 dark:text-white text-2xl">skip_next</span>
                    </div>
                    <span className="material-icons-round text-neutral-400">playlist_play</span>
                  </div>
                </div>
              </div>

              {/* Floating chord card */}
              <div className="absolute top-[20%] -right-4 lg:-right-12 bg-surface-light dark:bg-surface-dark p-4 rounded-2xl shadow-soft-xl border border-neutral-100 dark:border-neutral-800 w-48 z-30 animate-float-slow">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary font-mono">F#m7b5</span>
                  <span className="text-[10px] bg-neutral-100 dark:bg-neutral-700 px-1.5 py-0.5 rounded text-neutral-500 font-mono">POS 2</span>
                </div>
                <div className="w-full h-32 relative bg-neutral-50 dark:bg-neutral-900/50 rounded-lg border border-neutral-100 dark:border-neutral-800 p-2">
                  <div className="grid grid-cols-4 h-full w-full relative">
                    <div className="border-r border-neutral-300 dark:border-neutral-700 h-full" />
                    <div className="border-r border-neutral-300 dark:border-neutral-700 h-full" />
                    <div className="border-r border-neutral-300 dark:border-neutral-700 h-full" />
                    <div className="h-full" />
                    <div className="absolute w-full border-b border-neutral-300 dark:border-neutral-700 top-[20%]" />
                    <div className="absolute w-full border-b border-neutral-300 dark:border-neutral-700 top-[40%]" />
                    <div className="absolute w-full border-b border-neutral-300 dark:border-neutral-700 top-[60%]" />
                    <div className="absolute w-full border-b border-neutral-300 dark:border-neutral-700 top-[80%]" />
                    <div className="absolute top-[10%] left-[16.6%] w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 shadow-sm" />
                    <div className="absolute top-[30%] left-[32%] w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 shadow-sm" />
                    <div className="absolute top-[30%] left-[50%] w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 shadow-sm" />
                    <div className="absolute top-[30%] left-[84%] w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 shadow-sm" />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-neutral-500 font-medium">
                  <span>Variations</span>
                  <span className="text-primary cursor-pointer hover:underline">See all 4</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
      </section>
      <Footer />
    </div>
  );
}
