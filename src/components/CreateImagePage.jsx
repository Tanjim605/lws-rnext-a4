import { useState } from "react";

import { promptContext } from "../context";
import AdvanceSearch from "./AdvanceSearch";
import Heading from "./Heading";
import Results from "./Results";
import SearchInput from "./SearchInput";

export default function CreateImagePage() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Flux");
  const [height, setHeight] = useState(1024);
  const [width, setWidth] = useState(1024);
  const [selectedRatio, setSelectedRatio] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState("");

  let baseUrl = "https://image.pollinations.ai/prompt/";
  // let urlWithParameter = `https://image.pollinations.ai/prompt/{prompt}?width={width}&height={height}&seed=42&model={model}`;

  function handleSend(e) {
    e.preventDefault();
    setGeneratedImageUrl(baseUrl);
  }

  return (
    <>
      <Heading text="Let's create a masterpiece, Alvian! " />
      <promptContext.Provider
        value={{
          prompt,
          setPrompt,
          width,
          setWidth,
          height,
          setHeight,
          selectedRatio,
          setSelectedRatio,
          model,
          setModel,
          setGeneratedImageUrl,
        }}
      >
        <SearchInput handleSend={handleSend} />
        <AdvanceSearch />

        {generatedImageUrl ? <Results url={generatedImageUrl} /> : ""}
      </promptContext.Provider>
    </>
  );
}
