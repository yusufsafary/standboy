export function TopBanner() {
  return (
    <div
      className="sticky top-0 z-[60] w-full"
      style={{ background: "#FF3C00" }}
    >
      <div className="max-w-6xl mx-auto px-4 h-10 flex items-center justify-center gap-0 sm:gap-6">

        {/* X / Twitter account */}
        <a
          href="https://x.com/appstandboy"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-150 shrink-0"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.05em" }}
        >
          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current flex-shrink-0">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.73-8.835L1.254 2.25H8.08l4.26 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
          </svg>
          <span className="hidden sm:inline">@appstandboy</span>
          <span className="sm:hidden">@appstandboy</span>
        </a>

        {/* Divider */}
        <span
          className="hidden sm:block w-px h-4 mx-1 opacity-40"
          style={{ background: "white" }}
        />

        {/* Divider mobile */}
        <span
          className="block sm:hidden w-px h-4 mx-2 opacity-40"
          style={{ background: "white" }}
        />

        {/* Token launch */}
        <a
          href="https://kickstart.easya.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors duration-150 shrink-0"
          style={{ fontFamily: "'Space Mono', monospace", fontSize: "0.7rem", letterSpacing: "0.05em" }}
        >
          {/* Animated pulse dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="font-bold">$STD</span>
          <span className="text-white/80">TOKEN — COMING SOON</span>
          <svg className="w-2.5 h-2.5 text-white/70 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>

      </div>
    </div>
  );
}
