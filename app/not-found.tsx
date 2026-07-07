
import NoPrefetchLink from "../components/ui/NoPrefetchLink";

export default function NotFound() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, #e7e5e4 1px, transparent 1px),
        linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
      `,
          backgroundSize: "5px 5px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
       repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          WebkitMaskImage: `
 repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
          radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
      `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6">
        <div className="w-full max-w-2xl rounded-2xl border border-neutral-300 bg-white ring ring-neutral-200 ring-offset-2 md:ring-offset-4 p-8 sm:p-10 md:p-12 text-center">
          <p className="mb-3 text-sm sm:text-base font-switzer font-medium tracking-widest text-[#0F5C85]">
            ERROR 404
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sentient font-semibold text-textcolor leading-tight mb-4">
            Page Not Found
          </h1>
          <p className="text-base sm:text-lg font-switzer text-textcolor/80 mb-8">
            The page you are looking for does not exist or may have been moved.
          </p>
          <NoPrefetchLink
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-linear-to-r from-neutral-800 to-neutral-500 px-6 py-3 text-sm sm:text-base font-sentient font-medium text-white border border-neutral-200 ring ring-neutral-300 ring-offset-2 transition-opacity hover:opacity-90"
          >
            Back to Home
          </NoPrefetchLink>
        </div>
      </div>
    </main>
  );
}
