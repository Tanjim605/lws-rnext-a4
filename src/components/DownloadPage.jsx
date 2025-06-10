import { useContext } from "react";
import { downloadedContext } from "../context";
import DownloadImageCard from "./DownloadImageCard";
import Heading from "./Heading";

export default function CreateImagePage() {
  const { downloadedRef } = useContext(downloadedContext);

  return (
    <>
      <Heading text="Downloaded " />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {downloadedRef.current.map((downLink, indx) => (
          <DownloadImageCard key={indx} downLink={downLink} />
        ))}
      </div>
    </>
  );
}
