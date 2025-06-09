import DownloadIconSvg from "./SVG/DownloadIconSvg";

export default function ResultImageCard() {
  return (
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      <div className="absolute bottom-2 right-2  p-1 ">
        <DownloadIconSvg />
      </div>
      <img
        src="./assets/images/ai-image-1.jpeg"
        alt="Anime character in kimono"
        className="w-full h-48 object-cover"
      />
    </div>
  );
}
