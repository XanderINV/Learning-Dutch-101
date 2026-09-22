type Props = {
  title: string;
  body: string;
};

export function ExplanationCard({ title, body }: Props) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {body.split('\n\n').map((para) => (
        <p key={para.slice(0, 24)}>{para}</p>
      ))}
    </section>
  );
}
