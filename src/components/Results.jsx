import ResultImageCard from "./ResultImageCard";

export default function Results({ url }) {
  return (
    <div>
      <h3 className="text-zinc-200 mb-4 font-bold text-lg">Result</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <ResultImageCard src={url} />
      </div>
    </div>
  );
}
