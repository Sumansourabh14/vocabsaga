import WordInput from "@/components/WordInput";
import { SITE_TITLE } from "@/data/constants";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section className="min-h-screen">
          <h1>{SITE_TITLE}</h1>
          <WordInput />
        </section>
      </main>
    </>
  );
};

export default Home;
