import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function MetronomePage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col selection:bg-primary/30">
      <Navbar />
      <section className="relative flex-grow flex items-center justify-center py-32 overflow-hidden pt-28 sm:pt-32">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-[-50%]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -z-10 translate-x-[20%] translate-y-[20%]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: Content */}
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">Precision Timing</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
                  Absolute Rhythm.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Zero Distraction.</span>
                </h1>
                <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg font-light">
                  Experience the most precise metronome engine ever built for mobile. Designed for professionals who demand exactness down to the millisecond.
                </p>
              </div>

              <div className="grid gap-10">
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-primary text-2xl">touch_app</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Tactile BPM Control</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Adjust tempo with single-digit precision using our haptic-enabled dial interface. Feel every click as you dial in the perfect groove.
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-neutral-800 shadow-sm border border-neutral-100 dark:border-neutral-700 flex items-center justify-center shrink-0">
                    <span className="material-icons-round text-primary text-2xl">visibility</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                      Signature Glow Mode
                      <span className="px-2 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-bold uppercase tracking-wider">New</span>
                    </h3>
                    <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      Stay in the pocket even in loud environments. The screen pulses in sync with your beat, providing a clear visual cue when audio isn&apos;t enough.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/#feature-metronome"
                  className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/90 transition-colors"
                >
                  Explore all timing tools
                  <span className="material-icons-round text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-300/20 blur-[100px] rounded-full scale-75 lg:translate-x-12 -z-10" />
              <div className="relative w-[340px] h-[680px] bg-neutral-900 rounded-[50px] shadow-2xl border-[8px] border-neutral-900 overflow-hidden ring-1 ring-neutral-900/50 z-10">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-8 bg-black z-30 flex justify-center items-end pb-1">
                  <div className="w-24 h-6 bg-black rounded-full relative z-40" />
                </div>

                <div className="w-full h-full bg-white dark:bg-background-dark relative flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center px-6 pt-14 pb-4">
                    <span className="material-icons-round text-neutral-400 text-xl">menu</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Metronome</span>
                    <span className="material-icons-round text-neutral-400 text-xl">settings</span>
                  </div>

                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="absolute w-64 h-64 rounded-full border border-primary/10 animate-pulse-ring" />
                    <div className="absolute w-64 h-64 rounded-full border border-primary/20 animate-pulse-ring" style={{ animationDelay: "0.5s" }} />

                    <div className="relative z-10 w-64 h-64 rounded-full bg-background-light dark:bg-neutral-900/50 shadow-inner flex items-center justify-center border border-neutral-200 dark:border-neutral-800 animate-beat">
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle className="text-neutral-200 dark:text-neutral-800" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeWidth="2" />
                        <circle className="text-primary" cx="50" cy="50" fill="none" r="46" stroke="currentColor" strokeDasharray="289" strokeDashoffset="70" strokeLinecap="round" strokeWidth="2" />
                      </svg>
                      <div className="text-center">
                        <div className="text-7xl font-bold text-neutral-900 dark:text-white tracking-tighter">128</div>
                        <div className="text-sm font-medium text-primary uppercase tracking-widest mt-1">BPM</div>
                      </div>
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(94,53,177,0.8)]" />
                    </div>

                    <div className="mt-12 flex gap-4">
                      <button type="button" className="px-4 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 font-bold text-sm">
                        4/4
                      </button>
                      <button type="button" className="px-4 py-2 rounded-lg bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">
                        TAP
                      </button>
                    </div>
                  </div>

                  <div className="pb-10 px-8">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-semibold text-neutral-400">Subdivision</span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                      </div>
                    </div>
                    <button type="button" className="w-full py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-lg shadow-xl flex items-center justify-center gap-2">
                      <span className="material-icons-round">pause</span> Stop
                    </button>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none z-20" />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-24 -left-6 lg:-left-12 bg-white dark:bg-neutral-800 p-4 rounded-xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-neutral-100 dark:border-neutral-700 max-w-[180px] z-20 hidden md:block animate-bounce" style={{ animationDuration: "3s" }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center">
                    <span className="material-icons-round text-sm">battery_charging_full</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-500 uppercase">Efficiency</span>
                </div>
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  Low power mode enabled for extended sessions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
