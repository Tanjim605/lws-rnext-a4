import { useContext, useEffect, useState } from "react";
import { PromptContext } from "../context/index";

export default function AdvanceSearch() {
  const {
    height,
    setHeight,
    width,
    setWidth,
    setModel,
    setGeneratedImageUrl,
    selectedRatio,
    setSelectedRatio,
  } = useContext(PromptContext);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await fetch("https://image.pollinations.ai/models");
        if (!response.ok) {
          throw new Error("Failed to fetch models");
        }
        const modelsList = await response.json();
        setModels(modelsList);
        // models.current = modelsList;
        console.log(modelsList);

        // Set default model (e.g., first model or a fallback)
        // setSelectedModel(modelsList[0] || "flux");
      } catch (err) {
        console.error("Error fetching models:", err);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium">Advanced Settings</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Model
          </label>
          <select
            onChange={() => {
              setModel(event.target.value), setGeneratedImageUrl("");
            }}
            id="model"
            className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {/* selected attribute is removed because of console error from react */}
            {models.length > 0 ? (
              models.map((model, idx) => (
                <option className="bg-zinc-900" key={idx} value={model}>
                  {model}
                </option>
              ))
            ) : (
              <option key="1" value="">
                Loading models...
              </option>
            )}
          </select>
        </div>

        <div>
          <label
            htmlFor="seed"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Seed (for reproducible results)
          </label>
          <input
            type="number"
            id="seed"
            disabled={true}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="Random"
          />
        </div>

        <div>
          <label
            htmlFor="width"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Width
          </label>
          <input
            onChange={() => {
              setWidth(event.target.value),
                setGeneratedImageUrl(""),
                setSelectedRatio(null);
            }}
            type="number"
            id="width"
            value={width}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-zinc-700 mb-1"
          >
            Height
          </label>
          <input
            onChange={() => {
              setHeight(event.target.value),
                setGeneratedImageUrl(""),
                setSelectedRatio(null);
            }}
            type="number"
            id="height"
            value={height}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Aspect Ratio Presets
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setHeight(1024), setWidth(1024), setSelectedRatio("1:1");
              }}
              className={`${
                selectedRatio == "1:1" ? "bg-zinc-800" : "bg-zinc-900/10"
              }   px-3 py-3 text-xs  hover:bg-zinc-800 rounded transition-colors`}
            >
              1:1
            </button>
            <button
              onClick={() => {
                setHeight(576), setWidth(1024), setSelectedRatio("16:9");
              }}
              className={`${
                selectedRatio == "16:9" ? "bg-zinc-800" : "bg-zinc-900/10"
              }   px-3 py-3 text-xs  hover:bg-zinc-800 rounded transition-colors`}
            >
              16:9
            </button>
            <button
              onClick={() => {
                setHeight(768), setWidth(1024), setSelectedRatio("4:3");
              }}
              className={`${
                selectedRatio == "4:3" ? "bg-zinc-800" : "bg-zinc-900/10"
              }   px-3 py-3 text-xs  hover:bg-zinc-800 rounded transition-colors`}
            >
              4:3
            </button>
            <button
              onClick={() => {
                setHeight(683), setWidth(1024), setSelectedRatio("3:2");
              }}
              className={`${
                selectedRatio == "3:2" ? "bg-zinc-800" : "bg-zinc-900/10"
              }   px-3 py-3 text-xs  hover:bg-zinc-800 rounded transition-colors`}
            >
              3:2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
