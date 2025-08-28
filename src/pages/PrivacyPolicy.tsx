export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-3xl">
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-center">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-6 mt-12">
          Last updated: August 29, 2025
        </p>

        {/* Content */}
        <div className="space-y-6 leading-relaxed">
          <p>
            At <span className="font-semibold">Vocabsaga</span>, your privacy is
            important to us. This Privacy Policy explains how we handle your
            information when you use our platform. All data is stored locally on
            your device, and no data is transmitted to or stored on our servers.
          </p>

          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              1. Information We Collect
            </h2>
            <p>
              - Usage Data: Bookmarks, saved words, and preferences are stored
              locally on your device using local storage.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to:
              <br />- Personalize and improve your learning experience.
              <br />- Maintain your saved vocabulary and progress.
              <br />
              All data remains on your device and is never shared externally.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">
              3. Data Storage and Security
            </h2>
            <p>
              All app data is stored locally on your device. While we use
              standard measures to secure the app, you are responsible for
              keeping your device secure. Deleting browser storage or
              uninstalling the app will erase all stored information
              permanently.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">4. No Data Sharing</h2>
            <p>
              Vocabsaga does not collect, store, or share your data with third
              parties or servers.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
            <p>
              You can manage your data at any time by:
              <br />- Clearing browser local storage.
              <br />- Uninstalling the app or resetting the app data, which
              removes all stored data.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
            <p>
              For questions or feedback, reach us through our feedback form:{" "}
              <a
                href="https://forms.gle/6xkf5GbPMU5YvA1Q8"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-muted-foreground"
              >
                forms.gle/6xkf5GbPMU5YvA1Q8
              </a>
            </p>
          </div>

          {/* Updates */}
          <p>
            We may update this Privacy Policy occasionally. Please check this
            page for the latest version.
          </p>

          {/* Footer */}
          <p className="text-gray-500 text-center text-sm pt-6">
            Vocabsaga &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
