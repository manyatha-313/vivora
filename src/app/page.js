import Link from 'next/link'
import MorphingLogo from '@/components/MorphingLogo'
import { hero, intro, howItWorks, closingCta } from '@/content/home'
import Button from '@/components/ui/Button'
import { H1, H2 } from '@/components/ui/Heading'
import FunFacts from '@/components/FunFacts'
import ToasterEgg from '@/components/ToasterEgg'

export default function Home() {
  return (
    <main>
      <section className="max-w-3xl mx-auto px-6 sm:px-10 pt-40 sm:pt-52 pb-20 text-center">
        <MorphingLogo />
        <H1>{hero.headline}</H1>
        <p className="text-[var(--muted)] mt-4 text-lg max-w-xl mx-auto">{hero.subtext}</p>
        <Button href="/explore" size="lg">{hero.cta} →</Button>
      </section>

      <section className="bg-[var(--surface)] border-y border-[var(--border)] py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <H2 className="text-center">{intro.heading}</H2>
          <p className="text-[var(--muted)] text-center mt-3 max-w-xl mx-auto">{intro.subtext}</p>
          <div className="grid sm:grid-cols-4 gap-4 mt-10">
            {intro.cards.map((card) => (
              <div
                key={card.title}
                className="bg-[var(--background)] border border-[var(--border)] rounded-2xl p-5 hover:-translate-y-1 hover:shadow-md transition-all"
              >
                <h3 className="font-semibold mb-1">{card.title}</h3>
                <p className="text-sm text-[var(--muted)]">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <H2 className="text-center">{howItWorks.heading}</H2>
          <div className="grid sm:grid-cols-4 gap-6 mt-10">
            {howItWorks.steps.map((step) => (
              <div key={step.n} className="text-center sm:text-left">
                <span className="text-[var(--primary)] text-2xl font-bold">{step.n}</span>
                <h3 className="font-semibold mt-2">{step.title}</h3>
                <p className="text-sm text-[var(--muted)] mt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] border-t border-[var(--border)] py-20 text-center">
        <div className="max-w-2xl mx-auto px-6 sm:px-10">
          <H2>{closingCta.heading}</H2>
          <p className="text-[var(--muted)] mt-3">{closingCta.subtext}</p>
          <Button href="/explore" size="lg">{closingCta.cta} →</Button>
        </div>
      </section>

      <FunFacts />
      <ToasterEgg />

    </main>
  )
}