import arabPeopleParade from "@/assets/hero/arab-people-parade-neck.png";

const people = Array.from({ length: 44 }, (_, index) => index);
const upperRow = people.filter((index) => index % 2 === 0);
const lowerRow = people.filter((index) => index % 2 === 1);

function PersonPortrait({ index }: { index: number }) {
  const position = `${(index / (people.length - 1)) * 100}% 100%`;

  return (
    <span className="sahl-parade-card" aria-hidden="true">
      <span
        className="sahl-parade-portrait"
        style={{
          backgroundImage: `url(${arabPeopleParade})`,
          backgroundPosition: position,
        }}
      />
    </span>
  );
}

function ParadeRow({ indices, reverse = false }: { indices: number[]; reverse?: boolean }) {
  return (
    <div className="sahl-parade-window" aria-hidden="true">
      <div className={`sahl-parade-track${reverse ? " is-reverse" : ""}`}>
        {[0, 1].map((copy) => (
          <div className="sahl-parade-set" key={copy}>
            {indices.map((index) => (
              <PersonPortrait index={index} key={`${copy}-${index}`} />
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
        <ParadeRow indices={upperRow} />
        <ParadeRow indices={lowerRow} reverse />
      </div>
    </section>
  );
}