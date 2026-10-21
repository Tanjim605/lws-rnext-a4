import { useContext, useEffect, useRef, useState } from "react";
import { DownloadedContext } from "../context/index";

import DownloadIconSvg from "./SVG/DownloadIconSvg";

export default function ResultImageCard({
  src,
  seed,
  requestDelay,
  prompt,
  width,
  height,
  model,
}) {
  const { downloadedRef } = useContext(DownloadedContext);
  const imageAspectRatio = `${width} / ${height}`;

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isWaiting, setIsWaiting] = useState(requestDelay > 0);
  const [loadingProgress, setLoadingProgress] = useState(
    requestDelay > 0 ? 0 : 100
  );
  const [remainingSeconds, setRemainingSeconds] = useState(
    Math.ceil(requestDelay / 1000)
  );
  const [isError, setIsError] = useState(null);

  let imageSource = useRef(""),
    downloadUrl = useRef("");

  useEffect(() => {
    let parameter = "";
    let timeoutId;
    let progressIntervalId;
    let reader;
    const controller = new AbortController();

    setIsImageLoading(true);
    setIsWaiting(requestDelay > 0);
    setLoadingProgress(requestDelay > 0 ? 0 : 100);
    setRemainingSeconds(Math.ceil(requestDelay / 1000));
    setIsError(null);
    downloadUrl.current = "";

    // Making image link from prompts
    if (width == 1024 && height == 1024 && model == "flux")
      parameter = `${prompt}?&seed=${seed}&model=${model}`;
    else if (width == 1024 && height == 1024)
      parameter = `${prompt}?&seed=${seed}`;
    else
      parameter = `${prompt}?width=${width}&height=${height}&seed=${seed}&model=${model}`;

    imageSource.current = encodeURI(src + parameter);

    const fetchImage = async () => {
      try {
        await new Promise((resolve) => {
          const startedAt = Date.now();

          progressIntervalId = setInterval(() => {
            const elapsed = Date.now() - startedAt;
            const progress = Math.min(100, (elapsed / requestDelay) * 100);

            if (requestDelay > 0) {
              setLoadingProgress(progress);
              setRemainingSeconds(
                Math.max(0, Math.ceil((requestDelay - elapsed) / 1000))
              );
            }
          }, 250);

          timeoutId = setTimeout(() => {
            clearInterval(progressIntervalId);
            setIsWaiting(false);
            setLoadingProgress(100);
            resolve();
          }, requestDelay);
        });

        const response = await fetch(imageSource.current, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();

        reader = new FileReader();
        reader.onload = () => {
          downloadUrl.current = reader.result; // Store the base64 data URL
          setIsImageLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        if (error.name === "AbortError") return;

        console.error("Error fetching or processing the image:", error);
        setIsError(error.message);
        setIsImageLoading(false);
      }
    };

    fetchImage();

    return () => {
      clearTimeout(timeoutId);
      clearInterval(progressIntervalId);
      controller.abort();
      if (reader?.readyState === FileReader.LOADING) {
        reader.abort();
      }
    };
  }, [height, model, prompt, requestDelay, seed, src, width]);

  function handleDownload() {
    if (downloadUrl.current) {
      const notUnique = [imageSource.current, ...downloadedRef.current];
      // I am using a set to keep the unique values from the array
      downloadedRef.current = [...new Set(notUnique)];

      // console.log(`not unique  ${notUnique} unique ${downloadedRef.current}`);

      const link = document.createElement("a");
      link.setAttribute("download", "generatedImage.png");
      link.href = downloadUrl.current;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  return (
    <div className="image-card rounded-xl overflow-hidden relative">
      {isImageLoading ? (
        <div
          className="flex w-full flex-col items-center justify-center gap-3 bg-gray-700 px-6"
          style={{ aspectRatio: imageAspectRatio }}
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-500 border-t-blue-400" />
          <p className="font-semibold text-blue-300">
            {isWaiting
              ? `Queued — starts in ${remainingSeconds}s`
              : "Generating image..."}
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-600">
            <div
              className={`h-full rounded-full bg-blue-400 transition-[width] duration-300 ${
                isWaiting ? "" : "animate-pulse"
              }`}
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      ) : isError ? (
        <div
          className="flex w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-red-950/70 via-gray-800 to-gray-900 px-5 text-center"
          style={{ aspectRatio: imageAspectRatio }}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-red-400/30 bg-red-400/10 text-red-300">
            <svg
              aria-hidden="true"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m0 3.75h.008M10.3 3.9 2.85 17a2 2 0 0 0 1.74 3h14.82a2 2 0 0 0 1.74-3L13.7 3.9a2 2 0 0 0-3.4 0Z"
              />
            </svg>
          </div>
          <p className="font-semibold text-red-200">Image generation failed</p>
          <p className="max-w-xs text-xs leading-4 text-gray-300">
            We couldn&apos;t create this image. Please try generating it again.
          </p>
          <span className="mt-1 rounded-full border border-white/10 bg-black/20 px-2.5 py-1 text-[11px] text-gray-400">
            Seed {seed}
          </span>
          <p className="max-w-xs truncate text-[10px] text-red-300/60" title={isError}>
            {isError}
          </p>
        </div>
      ) : (
        <>
          <div className="absolute bottom-2 cursor-pointer right-2  p-1 ">
            <button onClick={handleDownload}>
              <DownloadIconSvg />
            </button>
          </div>
          <img
            src={imageSource.current}
            alt={prompt}
            className="w-full object-cover"
            style={{ aspectRatio: imageAspectRatio }}
          />
        </>
      )}
      {/* <img src={src} alt={prompt} className="w-full object-cover" /> */}
    </div>
  );
}
