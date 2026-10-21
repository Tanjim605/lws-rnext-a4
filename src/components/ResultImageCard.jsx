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

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  let imageSource = useRef(""),
    downloadUrl = useRef("");

  useEffect(() => {
    let parameter = "";
    let timeoutId;
    let reader;
    const controller = new AbortController();

    setIsImageLoading(true);
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
          timeoutId = setTimeout(resolve, requestDelay);
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
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      {isImageLoading ? (
        <p className="text-center align-middle  w-full h-48 bg-gray-700 font-semibold text-blue-500">Loading image...</p>
      ) : isError ? (
        <p className="text-center align-middle  w-full h-48 bg-gray-700 font-semibold text-red-400">Error: {isError}</p>
      ) : (
        <>
          <div className="absolute bottom-2 right-2  p-1 ">
            <button onClick={handleDownload}>
              <DownloadIconSvg />
            </button>
          </div>
          <img
            src={imageSource.current}
            alt={prompt}
            className="w-full object-cover"
          />
        </>
      )}
      {/* <img src={src} alt={prompt} className="w-full object-cover" /> */}
    </div>
  );
}
