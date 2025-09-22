import { Button } from "@/components/ui/button";

const DownloadAndroidApp = () => {
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
          <Button
            asChild
            className="bg-[#1b7a1b] hover:bg-green-800 text-white text-lg font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.sumsourabh14.vocabsaga"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Vocabsaga Android app on Google Play Store"
            >
              Download
            </a>
          </Button>
        </section>
      </div>
    </section>
  );
};

export default DownloadAndroidApp;
