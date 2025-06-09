import { useContext } from "react";
import { promptContext } from "../context/index";

import DownloadIconSvg from "./SVG/DownloadIconSvg";

export default function ResultImageCard({ src }) {
  const { prompt, width, height, model } = useContext(promptContext);

  let parameter = `${prompt}?width=${width}&height=${height}&seed=${Math.floor(
    Math.random() * 100
  )}&model=${model}`;

  src = src + parameter;
  src = encodeURI(src);
  // console.log(src);

  return (
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      <div className="absolute bottom-2 right-2  p-1 ">
        <DownloadIconSvg />
      </div>
      <img
        src={src}
        alt="Anime character in kimono"
        className="w-full object-cover"
      />
    </div>
  );
}
