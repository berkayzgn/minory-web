import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200 antialiased flex flex-col">
      <Navbar />
      <main className="flex-grow relative">
        {/* Page header layout: full-width strip */}
        <header className="pt-28 sm:pt-32 pb-12 sm:pb-16 bg-surface-light dark:bg-surface-dark border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4 border border-primary/20">
                Legal Documentation
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight">
                Privacy Policy
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light">
                Your creativity is yours alone. We believe in transparency and{" "}
                <span className="text-primary font-medium">zero-knowledge</span> data handling.
              </p>
              <div className="mt-4 text-sm text-neutral-500 dark:text-neutral-500">
                Effective Date: <span className="font-medium text-neutral-600 dark:text-neutral-300">October 26, 2023</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-3xl mx-auto space-y-16">
              <section className="max-w-none scroll-mt-32" id="introduction">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-primary opacity-50">01.</span> Introduction
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  At Minory Studio, we build tools for professionals who demand precision and privacy. We understand that your creative work is intellectual property. This policy outlines our commitment to ensuring that your audio data, project files, and usage habits remain exclusively yours. We have designed our architecture to be &quot;offline-first,&quot; meaning your studio environment is isolated from unnecessary data collection.
                </p>
              </section>

              <section className="scroll-mt-32" id="microphone">
                <div className="bg-white dark:bg-surface-dark rounded-xl p-8 border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                  <div className="relative z-10">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-3">
                      <span className="p-2 rounded bg-primary/10 text-primary">
                        <span className="material-icons-round text-xl">mic</span>
                      </span>
                      <span>02. Microphone Usage</span>
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                      Minory Studio requires access to your microphone solely for the purpose of real-time audio processing, tuning, and recording within the application environment.
                    </p>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <span className="material-icons-round text-green-500 mt-0.5 text-xl">check_circle</span>
                        <span className="text-neutral-700 dark:text-neutral-200 text-sm">
                          <strong>Local Processing Only:</strong> All audio input is processed directly on your device&apos;s CPU/GPU.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-icons-round text-green-500 mt-0.5 text-xl">check_circle</span>
                        <span className="text-neutral-700 dark:text-neutral-200 text-sm">
                          <strong>No Server Uploads:</strong> We do not upload, stream, or analyze your audio on remote servers. Your voice never leaves your machine.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="material-icons-round text-green-500 mt-0.5 text-xl">check_circle</span>
                        <span className="text-neutral-700 dark:text-neutral-200 text-sm">
                          <strong>Ephemeral Access:</strong> The microphone is only active while you are recording or using the tuner feature.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="scroll-mt-32" id="tracking">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-primary opacity-50">03.</span> No Tracking Policy
                </h2>
                <div className="bg-neutral-50 dark:bg-white/5 p-6 rounded-lg border border-neutral-200 dark:border-white/10">
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                    Unlike many modern applications, Minory Studio does not employ third-party analytics trackers, advertising IDs, or behavioral profiling tools. We believe that your workflow is private.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="material-icons-round text-neutral-400">block</span> No Google Analytics
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="material-icons-round text-neutral-400">block</span> No Facebook Pixel
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="material-icons-round text-neutral-400">block</span> No Crashlytics
                    </div>
                    <div className="flex items-center gap-3 text-sm text-neutral-500 dark:text-neutral-400">
                      <span className="material-icons-round text-neutral-400">block</span> No Ad SDKs
                    </div>
                  </div>
                </div>
              </section>

              <section className="scroll-mt-32" id="data-privacy">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-primary opacity-50">04.</span> Data Storage &amp; Security
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                  Your project files (`.mnry`), presets, and recorded stems are stored locally on your hard drive. You maintain 100% ownership and control over these files. Deleting the application does not delete your project files unless you manually remove them.
                </p>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                  For cloud sync features (if enabled), we utilize end-to-end encryption. Minory Studio employees cannot decrypt or view your project contents stored in the cloud sync container.
                </p>
              </section>

              <section className="scroll-mt-32 pt-8 border-t border-neutral-200 dark:border-white/10" id="contact">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-primary opacity-50">05.</span> Contact Us
                </h2>
                <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  If you have specific questions about our architecture or privacy practices, please reach out to our legal team.
                </p>
                <a
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/90 transition-colors"
                  href="mailto:privacy@minorystudio.com"
                >
                  <span className="material-icons-round">mail</span>
                  privacy@minorystudio.com
                </a>
              </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
