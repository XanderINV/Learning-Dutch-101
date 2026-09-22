import { BRAND } from '@/brand';

export function AboutPage() {
  return (
    <>
      <header className="page-header">
        <h1>About {BRAND.name}</h1>
        <p>
          A calm, adult-friendly path to Dutch built for self-study and shared
          devices. Curriculum aligns with CEFR-inspired levels (pre-A1 through B1).
        </p>
      </header>
      <section className="card">
        <h2>Sources & acknowledgements</h2>
        <ul>
          <li>
            Pronunciation via your browser&apos;s Dutch (<code>nl-NL</code>) speech
            synthesis — voices vary by system.
          </li>
          <li>
            Content authors document canonical sources in module metadata and{' '}
            <code>docs/content-guide.md</code>.
          </li>
          <li>
            This app stores progress locally in your browser; nothing is sent to a
            server.
          </li>
        </ul>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-muted)' }}>
          See also <code>docs/curriculum-research.md</code> when published by the
          curriculum team.
        </p>
      </section>
    </>
  );
}
