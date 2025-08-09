const FeedbackBar = () => {
  return (
    <div className="border-b border-[#1b7a1b]/20 bg-[#1b7a1b]/10 dark:bg-[#1b7a1b]/10 py-2 px-4 text-center text-sm">
      <div className="max-w-[1300px] mx-auto">
        <p>
          We value your input!{" "}
          <a
            href="https://forms.gle/6xkf5GbPMU5YvA1Q8"
            className="text-[#1b7a1b] dark:text-[#4caf50] underline hover:no-underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            Share feedback here
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default FeedbackBar;
