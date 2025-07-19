import WordOfDay from "@/components/sections/WordOfDay";
import WordInput from "@/components/WordInput";
import { SITE_TITLE } from "@/data/constants";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section className="min-h-screen">
          <section className="px-4 py-16 text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              {SITE_TITLE}
            </h1>
            <p className="text-base md:text-lg">
              Build your own vocabulary, one word at a time.
            </p>
          </section>

          <WordOfDay />

          <WordInput />
        </section>
      </main>
    </>
  );
};

export default Home;
