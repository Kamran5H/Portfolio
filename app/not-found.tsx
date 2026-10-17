import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="section-shell section-space">
      <p className="eyebrow">404 / Page not found</p>
      <h1 className="display text-5xl sm:text-7xl mt-6 mb-6">
        Let’s get you
        <br />
        back on track.
      </h1>
      <p className="text-paper-dim max-w-lg mb-8">
        This address does not lead to a page on Muhammad Kamran Ashraf’s
        portfolio.
      </p>
      <Link className="btn btn-emerald" href="/">
        Return to the portfolio ↗
      </Link>
    </main>
  );
}
