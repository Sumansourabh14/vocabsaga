import { MagicCard } from "@/components/magicui/magic-card";
import DownloadAndroidApp from "@/components/sections/DownloadAndroidApp";
import { Features } from "@/components/sections/homePage/Features";
import Hero from "@/components/sections/homePage/Hero";
import Why from "@/components/sections/homePage/Why";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section>
          <section className="flex flex-col md:flex-row items-center gap-12">
            <Hero />
            <DownloadAndroidApp />
          </section>
          <Why />

          <section className="max-w-[1000px] mx-auto px-8 py-30">
            <h2 className="scroll-m-20 pb-2 mb-12 text-3xl md:text-4xl font-bold tracking-tight text-center">
              <span className="text-[#1b7a1b]">Love words?</span> You&apos;re at
              the right place
            </h2>
            <Features />
          </section>

          <section className="max-w-[1000px] mx-auto px-8 py-30">
            <section>
              <h2 className="scroll-m-20 pb-2 text-3xl md:text-4xl font-bold tracking-tight text-center">
                How it works?
              </h2>
              <section className="grid grid-cols-1 lg:grid-cols-3 mt-12 gap-8">
                <MagicCard className="rounded-xl">
                  <div className="py-12 px-6 space-y-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      1. Read a story
                    </h3>
                    <p className="text-md">
                      Engaging short passages written for learners.
                    </p>
                  </div>
                </MagicCard>
                <MagicCard className="rounded-xl">
                  <div className="py-12 px-6 space-y-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      2. Discover new words
                    </h3>
                    <p className="text-md">
                      Know the meaning of the word in context.
                    </p>
                  </div>
                </MagicCard>
                <MagicCard className="rounded-xl">
                  <div className="py-12 px-6 space-y-8">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      3. Save & review
                    </h3>
                    <p className="text-md">
                      Save tricky words to your bookmark list and revisit
                      anytime.
                    </p>
                  </div>
                </MagicCard>
              </section>
            </section>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-30 text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to <span className="text-[#1b7a1b]">upgrade</span> your
              vocabulary?
            </h2>
            <Link
              to="/story"
              className="inline-block px-6 py-3 mt-4 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
            >
              Read your first sentence!
            </Link>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
