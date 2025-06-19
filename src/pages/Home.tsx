import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import { SITE_TITLE } from "@/data/constants";
import WordInput from "@/components/WordInput";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-[1300px] mx-auto">
        <section className="min-h-screen">
          <h1>{SITE_TITLE}</h1>
          <WordInput />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;
