import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function TunerPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col">
      <Navbar />
      <section className="relative flex-grow flex items-center py-24 overflow-hidden pt-28 sm:pt-32">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl -z-10 dark:bg-indigo-500/10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left: iPhone mockup (order 2 on mobile, 1 on lg) */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-full blur-2xl scale-90 translate-y-8 -z-10 opacity-60" />
              <div className="relative mx-auto border-neutral-800 bg-neutral-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-soft-xl">
                {/* Phone side buttons */}
                <div className="h-[32px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[72px] rounded-l-lg" />
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[124px] rounded-l-lg" />
                <div className="h-[46px] w-[3px] bg-neutral-800 absolute -left-[17px] top-[178px] rounded-l-lg" />
                <div className="h-[64px] w-[3px] bg-neutral-800 absolute -right-[17px] top-[142px] rounded-r-lg" />

                <div className="rounded-[2rem] overflow-hidden w-full h-full bg-background-dark relative flex flex-col">
                  {/* App header */}
                  <div className="pt-12 px-6 flex justify-between items-center z-10">
                    <span className="material-icons-round text-white/60 text-sm">menu</span>
                    <span className="text-white text-sm font-semibold tracking-wide">TUNER</span>
                    <span className="material-icons-round text-white/60 text-sm">settings</span>
                  </div>

                  {/* Tuner UI */}
                  <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div className="text-center mb-8 relative z-10">
                      <h1 className="text-8xl font-bold text-white tracking-tighter drop-shadow-[0_0_15px_rgba(94,53,177,0.5)]">
                        A<span className="text-4xl align-top ml-1 text-primary">4</span>
                      </h1>
                      <p className="text-primary font-medium mt-2">440.0 Hz</p>
                    </div>
                    <div className="w-full h-48 relative flex items-center justify-center">
                      <div className="absolute inset-x-8 h-1 bg-white/10 rounded-full" />
                      <div className="absolute h-4 w-1 bg-white/30 left-1/2 -translate-x-1/2 -top-1.5 rounded-full" />
                      <div className="absolute h-3 w-0.5 bg-white/10 left-1/4 top-0 rounded-full" />
                      <div className="absolute h-3 w-0.5 bg-white/10 right-1/4 top-0 rounded-full" />
                      <div
                        className="absolute w-1 h-20 bg-gradient-to-t from-primary to-primary/80 left-1/2 -translate-x-1/2 -bottom-4 rounded-full shadow-[0_0_20px_rgba(94,53,177,0.8)] transform -rotate-1 origin-bottom"
                        style={{ transition: "transform 100ms" }}
                      />
                      <div className="absolute bottom-0 w-full h-24 overflow-hidden opacity-30">
                        <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-primary to-transparent blur-xl animate-pulse" />
                      </div>
                    </div>
                    <div className="mt-8 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                      <span className="text-xs text-white font-mono tracking-widest">+0.2 CENTS</span>
                    </div>
                  </div>

                  {/* Bottom controls */}
                  <div className="pb-8 px-6">
                    <div className="flex justify-between items-center bg-white/5 p-1 rounded-xl">
                      <button type="button" className="flex-1 py-3 rounded-lg text-xs font-medium text-white bg-primary shadow-lg">
                        Chromatic
                      </button>
                      <button type="button" className="flex-1 py-3 rounded-lg text-xs font-medium text-white/50">
                        Guitar
                      </button>
                      <button type="button" className="flex-1 py-3 rounded-lg text-xs font-medium text-white/50">
                        Violin
                      </button>
                    </div>
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
                  Precision Detection <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80">Down to the Cent.</span>
                </h2>
                <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-lg">
                  Experience ultra-low latency pitch detection designed for professionals. Whether you are tuning a Stradivarius or a vintage synthesizer, our algorithm locks on with 0.1-cent accuracy in real-time.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">speed</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Instant Response</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Zero lag processing ensures what you play is instantly reflected on screen.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-surface-light dark:bg-white/5 flex items-center justify-center border border-neutral-200 dark:border-white/10">
                    <span className="material-icons-round text-primary text-2xl">dark_mode</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">Dark Mode Preview</h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      Designed for dimly lit stages and late-night studio sessions. Easy on the eyes.
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
                  to="/#feature-tuner"
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
                0.1<span className="text-primary text-xl ml-1">cent</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">
                4000<span className="text-primary text-xl ml-1">Hz</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Range Cap</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">
                &lt;2<span className="text-primary text-xl ml-1">ms</span>
              </div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Latency</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white font-display">12+</div>
              <div className="text-xs uppercase tracking-wider text-neutral-500 mt-1">Instruments</div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
