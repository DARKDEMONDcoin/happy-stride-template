const portraitModules = import.meta.glob("/src/assets/hero/portraits-display/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const countries = [
  "saudi",
  "uae",
  "kuwait",
  "qatar",
  "bahrain",
  "oman",
  "yemen",
  "iraq",
  "jordan",
  "lebanon",
  "syria",
  "morocco",
  "algeria",
  "tunisia",
  "libya",
  "mauritania",
  "egypt",
  "sudan",
  "somalia",
  "djibouti",
  "comoros",
  "palestine",
] as const;

const portraits = countries.flatMap((country) =>
  (["man", "woman"] as const).map((gender) => ({
    src: portraitModules[`/src/assets/hero/portraits-display/${country}-${gender}.webp`],
    key: `${country}-${gender}`,
  })),
);

const upperRow = portraits.slice(0, 22);
const lowerRow = portraits.slice(22);

function PersonPortrait({ portrait }: { portrait: (typeof portraits)[number] }) {
  if (!portrait.src) return null;

  return (
    <span className="sahl-parade-card" aria-hidden="true">
      <img
        className="sahl-parade-portrait"
        src={portrait.src}
        alt=""
        width={1024}
        height={1280}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

function ParadeRow({ row, reverse = false }: { row: typeof portraits; reverse?: boolean }) {
  return (
    <div className="sahl-parade-window" aria-hidden="true">
      <div className={`sahl-parade-track${reverse ? " is-reverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div className="sahl-parade-set" key={copy}>
            {row.map((portrait) => (
              <PersonPortrait portrait={portrait} key={`${copy}-${portrait.key}`} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingBeyondHero() {
  return (
    <section className="sahl-beyond" aria-labelledby="sahl-pricing-hero-title">
      <header className="sahl-beyond-copy">
        <h1 id="sahl-pricing-hero-title">
          <span>منصة</span>
          سهل
        </h1>
        <p>إمكانيات موظفين ذكاء اصطناعي لا حصر لها.</p>
      </header>

      <div className="sahl-parade" aria-hidden="true">
        <ParadeRow row={upperRow} />
        <ParadeRow row={lowerRow} reverse />
      </div>
    </section>
  );
}