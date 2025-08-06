import { Features } from "@/components/sections/homePage/Features";
import Hero from "@/components/sections/homePage/Hero";
import Why from "@/components/sections/homePage/Why";
import { Link } from "react-router";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section>
          <Hero />
          <Why />

          <section className="max-w-[1000px] mx-auto px-8 py-30">
            <Features />
          </section>

          <section className="px-6 py-16 bg-muted/50 max-w-4xl mx-auto space-y-8">
            <h2 className="text-2xl font-semibold text-center">How it works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-lg font-semibold">1. Read a story</h3>
                <p className="text-sm mt-2">
                  Engaging short passages written for learners.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">2. Discover new words</h3>
                <p className="text-sm mt-2">
                  Tap highlighted words to see meaning in context.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">3. Save & review</h3>
                <p className="text-sm mt-2">
                  Save tricky words to your list and revisit anytime.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="px-6 py-16 text-center max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold">
              Ready to upgrade your vocabulary?
            </h2>
            <Link
              to="/story"
              className="inline-block mt-4 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              Try your first story
            </Link>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
