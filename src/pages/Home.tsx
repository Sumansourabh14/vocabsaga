import Hero from "@/components/sections/homePage/Hero";
import Why from "@/components/sections/homePage/Why";

const Home = () => {
  return (
    <>
      <main className="max-w-[1300px] mx-auto">
        <section>
          <Hero />
          <Why />
        </section>
      </main>
    </>
  );
};

export default Home;
