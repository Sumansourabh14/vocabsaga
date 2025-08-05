export default function Why() {
  return (
    <section className="max-w-[1000px] py-20 px-8 mx-auto">
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl md:text-4xl font-bold tracking-tight first:mt-0">
          Why?
        </h2>
        <section className="max-w-2xl space-y-4 mt-4">
          <p>Because...</p>
          <p>Context.</p>
          <p>Humans need context.</p>
          <p>We remember stories, not definitions.</p>
          <p>
            Learning a word simply won't be as effective as learning it with
            some context.
          </p>
          <p>Think about it. What would be better?</p>
          <p>Learning a word by opening a random flashcard?</p>
          <p>Or...</p>
          <p>Learning by actually reading a passage or a story?</p>
        </section>
      </div>
      <a
        href="/story"
        className="inline-block px-6 py-3 mt-4 bg-[#1b7a1b] text-white text-lg font-semibold rounded-lg hover:bg-green-800 transition"
      >
        Learn by reading
      </a>
    </section>
  );
}
