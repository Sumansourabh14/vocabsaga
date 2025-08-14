import { useTheme } from "@/context/theme-provider";

const Hero = () => {
  const { theme } = useTheme();

  return (
    <section className="max-w-4xl px-4 py-20 md:py-24 text-center mx-auto space-y-4 flex flex-col items-center">
      <h1 className="max-w-3xl text-4xl sm:text-5xl md:text-7xl xl:text-8xl font-bold tracking-tight mx-auto">
        Not your average <span className="text-[#1b7a1b]">vocabulary</span> app
      </h1>
      <p className="text-md md:text-xl mt-4 text-muted-foreground max-w-xs md:max-w-sm">
        Learn words through passages, not with random single words.
      </p>
      <a
        href="/story"
        className="inline-block px-6 py-3 mt-4 mb-8 bg-[#1b7a1b] text-white text-md md:text-lg font-semibold rounded-lg hover:bg-green-800 transition"
      >
        Start Learning
      </a>
      <div>
        <a
          href="https://peerlist.io/sumansourabh/project/vocabsaga"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={`https://peerlist.io/api/v1/projects/embed/PRJHEOGEDBQRRQKPR2R87KAQE9QO7G?showUpvote=false&theme=${
              theme === "light" ? "light" : "dark"
            }`}
            alt="Vocabsaga"
            style={{ width: "14rem" }}
          />
        </a>
      </div>
    </section>
  );
};

export default Hero;
