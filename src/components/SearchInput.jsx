import { useContext } from "react";
import { PromptContext } from "../context/index";

import SearchIconSvg from "./SVG/SearchIconSvg";
import SendIconSvg from "./SVG/SendIconSvg";

export default function SearchInput({ handleSend }) {
  const { prompt, setPrompt, setGeneratedImageUrl } = useContext(PromptContext);

  function handleKeyDown(event) {
    if (event.key == "Enter") handleSend(event);
  }

  return (
    <div className="relative mb-8 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900/10 backdrop-blur-sm">
      <div className="flex items-center">
        <div className="pl-5 pr-2">
          <SearchIconSvg />
        </div>
        <input
          type="text"
          value={prompt}
          onChange={() => {
            setPrompt(event.target.value), setGeneratedImageUrl("");
          }}
          onKeyDown={() => handleKeyDown(event)}
          placeholder="Create with Prompts"
          className="outline-none w-full py-4 px-2 bg-transparent text-white placeholder-zinc-400 text-lg"
        />
        <button
          onClick={handleSend}
          className="bg-zinc-800 hover:bg-zinc-700 transition-colors p-4 mr-1 rounded-full"
        >
          <SendIconSvg />
        </button>
      </div>
    </div>
  );
}
