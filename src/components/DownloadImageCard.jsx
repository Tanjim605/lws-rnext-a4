import DownLoadIconSvg from "./SVG/DownloadIconSvg";

export default function DownloadImageCard({ downLink }) {
  return (
    <div className="image-card rounded-xl overflow-hidden cursor-pointer relative">
      <div className="absolute bottom-2 right-2  p-1 ">
        <DownLoadIconSvg />
      </div>
      <img
        src={downLink}
        alt="Generated Image"
        className="w-full object-cover"
      />
    </div>
  );
}
