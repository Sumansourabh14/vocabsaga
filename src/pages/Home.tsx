import Hero from "@/components/sections/homePage/Hero";
import WordOfDay from "@/components/sections/WordOfDay";
import { Separator } from "@/components/ui/separator";
import WordInput from "@/components/WordInput";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section className="min-h-screen">
          <Hero />
          <WordInput />

          <Separator />

          <WordOfDay />
        </section>
      </main>
    </>
  );
};

export default Home;
