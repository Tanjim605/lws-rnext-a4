import ResultImageCard from "./ResultImageCard";
import { useMemo } from "react";

const IMAGE_COUNT = 9;
const REQUEST_INTERVAL_MS = 45_000;

function createUniqueSeeds(count, salt = 0) {
  const seeds = new Set();

  while (seeds.size < count) {
    const randomSeed = Math.floor(Math.random() * 2_147_483_647);
    seeds.add((randomSeed + salt) % 2_147_483_647);
  }

  return [...seeds];
}

export default function Results({ url, generationId, generationOptions }) {
  const seeds = useMemo(
    () => createUniqueSeeds(IMAGE_COUNT, generationId),
    [generationId]
  );

  return (
    <div>
      <h3 className="text-zinc-200 mb-4 font-bold text-lg">Results:</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {seeds.map((seed, index) => (
          <ResultImageCard
            key={seed}
            src={url}
            seed={seed}
            requestDelay={index * REQUEST_INTERVAL_MS}
            {...generationOptions}
          />
        ))}
      </div>
    </div>
  );
}
