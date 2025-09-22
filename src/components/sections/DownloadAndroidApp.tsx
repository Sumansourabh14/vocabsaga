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
          <h2 className="text-2xl md:text-3xl mb-4">Now on Android</h2>

          <a
            href="https://play.google.com/store/apps/details?id=com.sumsourabh14.vocabsaga"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download Vocabsaga Android app on Google Play Store"
          >
            <img
              src="./images/GetItOnGooglePlay_Badge_Web_color_English.png"
              alt="Get Vocabsaga Android app on Google Play Store badge"
              className="w-[150px] mx-auto"
            />
          </a>
        </section>
      </div>
    </section>
  );
};

export default DownloadAndroidApp;
