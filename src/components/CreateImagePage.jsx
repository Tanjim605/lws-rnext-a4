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
        value={{ prompt, setPrompt, width, height, model }}
      >
        <SearchInput handleSend={handleSend} />
        <AdvanceSearch
          setHeight={setHeight}
          setWidth={setWidth}
          setModel={setModel}
        />

        {generatedImageUrl ? <Results url={generatedImageUrl} /> : ""}
      </promptContext.Provider>
    </>
  );
}
