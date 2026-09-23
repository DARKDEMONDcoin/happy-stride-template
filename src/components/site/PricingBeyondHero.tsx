import { useEffect, useRef, useState } from "react";

import arabPeopleParade from "@/assets/hero/arab-people-parade.png";

/**
 * مقدمة سينمائية لصفحة الأسعار — تظهر فقط على الكمبيوتر والشاشات الكبيرة.
 * الطبقات والحركة مبنية على هوية سهل (قرميدي/ذهبي/تيل) بدون أي ألوان خارجية.
 */

const heroWords = ["شرارة", "تخيّل", "انطلق", "تطوّر", "بداية", "إنجاز", "هدف", "اشتعال"];

const marqueeText =
  "شرارة · تخيّل · انطلق · تطوّر · بداية · إنجاز · هدف · سهل · ";

const layers = [
  { color: "var(--sahl-hero-teal)", offset: 36 },
  { color: "var(--sahl-hero-bg)", offset: 24 },
  { color: "var(--sahl-hero-gold)", offset: 12 },
  { color: "var(--sahl-hero-front)", offset: 0 },
];

export function PricingBeyondHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const range = el.offsetHeight - window.innerHeight;
      if (range <= 0) {
        setProgress(1);
        return;
      }
      const raw = -rect.top / range;
      setProgress(Math.min(1, Math.max(0, raw)));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const wordOpacity = 0.55 + progress * 0.45;

  return (
    <div className="sahl-beyond" aria-hidden="true">
      <section ref={sectionRef} className="sahl-beyond-stage">
        <div className="sahl-beyond-sticky">
          <div className="sahl-beyond-title-wrap">
            <div className="sahl-beyond-title-stack">
              {layers.map((layer, index) => (
                <span
                  key={layer.offset}
                  className="sahl-beyond-title"
                  style={{
                    position: index === layers.length - 1 ? "relative" : "absolute",
                    color: layer.color,
                    transform: `translateY(${layer.offset}px)`,
                  }}
                >
                  سهل
                </span>
              ))}
            </div>
          </div>

          <div className="sahl-beyond-words" style={{ opacity: wordOpacity }}>
            {heroWords.map((word) => (
              <span key={word} className="sahl-beyond-word">
                {word}
              </span>
            ))}
          </div>

          <div className="sahl-beyond-people" aria-hidden="true">
            <div className="sahl-beyond-people-track">
              {[0, 1].map((copy) => (
                <div className="sahl-beyond-people-set" key={copy}>
                  {[arabPeopleParade].map((src, index) => (
                    <img
                      key={`${copy}-${src}`}
                      src={src}
                      alt=""
                      width={7392}
                      height={430}
                      loading={copy === 0 && index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sahl-beyond-marquee">
        <div className="sahl-beyond-marquee-track">
          {[0, 1, 2, 3].map((copy) => (
            <span key={copy} className="sahl-beyond-marquee-copy">
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
