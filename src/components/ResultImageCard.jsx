import { useContext } from "react";
import { downloadedContext, promptContext } from "../context/index";

import DownloadIconSvg from "./SVG/DownloadIconSvg";

export default function ResultImageCard({ src }) {
  const { prompt, width, height, model } = useContext(promptContext);
  const { downloadedRef } = useContext(downloadedContext);

  let parameter = "",
    downloadUrl = "";

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

  src = encodeURI(src + parameter);
  console.log(src);

  fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      return response.blob();
    })
    .then((blob) => {
      const reader = new FileReader();
      reader.onload = () => {
        downloadUrl = reader.result; // Store the base64 data URL
      };
      reader.readAsDataURL(blob);
    })
    .catch((err) => {
      console.error("Error fetching or processing the image:", err.message);
    });

  function handleDownload() {
    if (downloadUrl) {
      downloadedRef.current = [src, ...downloadedRef.current];
      const link = document.createElement("a");
      link.setAttribute("download", "generatedImage.png");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  }

  return (
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      <div className="absolute bottom-2 right-2  p-1 ">
        <button onClick={handleDownload}>
          <DownloadIconSvg />
        </button>
      </div>
      <img src={src} alt={prompt} className="w-full object-cover" />
    </div>
  );
}
