const Hero = () => {
  return (
    <section className="max-w-4xl px-4 py-20 md:py-28 text-center mx-auto space-y-4">
      <h1 className="max-w-3xl text-5xl md:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tighter mx-auto">
        Not your average <span className="text-[#1b7a1b]">vocabulary</span> app.
      </h1>
      <p className="text-2xl mt-8">One word at a time? That&apos;s history.</p>
      <a
        href="/story"
        className="inline-block px-6 py-3 mt-4 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
      >
        Learn through stories
      </a>
    </section>
  );
};

export default Hero;
