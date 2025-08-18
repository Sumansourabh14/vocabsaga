export default function Why() {
  return (
    <section className="py-20 px-8 text-center">
      <div className="max-w-5xl mx-auto mb-8">
        <h2 className="scroll-m-20 pb-8 text-3xl md:text-4xl font-bold tracking-tight first:mt-0">
          Why?
        </h2>
        <section className="space-y-4 mt-4">
          <p>Nothing beats learning words through reading.</p>
          <p>
            Vocabsaga gives you context, so you can learn new words effectively.
          </p>
        </section>
      </div>
      <a
        href="/story"
        className="inline-block px-6 py-3 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
      >
        Learn by reading
      </a>
    </section>
  );
}
