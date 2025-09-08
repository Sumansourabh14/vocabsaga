import WordOfDay from "@/components/sections/WordOfDay";

const WordOfTheDay = () => {
  return (
    <section className="max-w-[1300px] mx-auto px-8 py-8">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
        Word of the Day
      </h1>
      <WordOfDay />
    </section>
  );
};

export default WordOfTheDay;
