export default function Heading({ text }) {
  return (
    <h2 className="text-4xl font-bold mb-8">
      {text}
      <span className="text-2xl">👋</span>
    </h2>
  );
}
