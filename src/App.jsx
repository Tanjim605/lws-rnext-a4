import { useState } from "react";
import "./App.css";
import CreateImagePage from "./components/CreateImagePage";
import DownloadPage from "./components/DownloadPage";
import Glow from "./components/Glow";
import Header from "./components/Header";

function App() {
  const [route, setRoute] = useState("create");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header setRoute={setRoute} />
      <Glow />
      <main className="relative z-10">
        {route === "create" ? <CreateImagePage /> : <DownloadPage />}
      </main>
    </div>
  );
}

export default App;
