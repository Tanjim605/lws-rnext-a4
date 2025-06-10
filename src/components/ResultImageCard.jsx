import { useContext, useEffect, useRef, useState } from "react";
import { DownloadedContext, PromptContext } from "../context/index";

import DownloadIconSvg from "./SVG/DownloadIconSvg";

export default function ResultImageCard({ src }) {
  const { prompt, width, height, model } = useContext(PromptContext);
  const { downloadedRef } = useContext(DownloadedContext);

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  let imageSource = useRef(""),
    downloadUrl = useRef("");

  useEffect(() => {
    let parameter = "";
    // Making image link from prompts
    if (width == 1024 && height == 1024 && model == "flux")
      parameter = `${prompt}?&seed=${Math.floor(
        Math.random() * 100
      )}&model=${model}`;
    else if (width == 1024 && height == 1024)
      parameter = `${prompt}?&seed=${Math.floor(Math.random() * 100)}`;
    else
      parameter = `${prompt}?width=${width}&height=${height}&seed=${Math.floor(
        Math.random() * 100
      )}&model=${model}`;

    imageSource.current = encodeURI(src + parameter);
    console.log(imageSource.current);

    const fetchImage = async () => {
      try {
        // setIsImageLoading(true);
        const response = await fetch(imageSource.current);
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const blob = await response.blob();

        const reader = new FileReader();
        reader.onload = () => {
          downloadUrl.current = reader.result; // Store the base64 data URL
          setIsImageLoading(false);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Error fetching or processing the image:", error);
        setIsError(error.message);
        setIsImageLoading(false);
      }
    };
    fetchImage();
  }, []);

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
