import { Button } from "@/components/ui/button";

const AndroidEarlyAccess = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1300px] mx-auto">
        <section className="text-center space-y-2">
          <img
            src="./images/android-mockup.webp"
            alt="Vocabsaga android mockup Samsung Galaxy S24 Ultra"
            className="w-[300px] mx-auto"
          />
          <h2 className="text-2xl md:text-3xl">Now on Android</h2>
          <p>(Early Access)</p>
          <Button
            asChild
            className="bg-[#1b7a1b] hover:bg-green-800 text-white text-lg font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <a
              href="https://forms.gle/example"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Sign up for Vocabsaga Android app early access"
            >
              Join the Waitlist
            </a>
          </Button>
        </section>
      </div>
    </section>
  );
};

export default AndroidEarlyAccess;
