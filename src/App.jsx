import { useState, useRef } from "react";
import "./App.css";

import CreateImagePage from "./components/CreateImagePage";
import DownloadPage from "./components/DownloadPage";
import Glow from "./components/Glow";
import Header from "./components/Header";
import { downloadedContext } from "./context";

function App() {
  const [route, setRoute] = useState("create");
  const downloadedRef = useRef([])

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header active={route} setRoute={setRoute} />
      <Glow />
      <downloadedContext.Provider value={{ downloadedRef  }}>
        <main className="relative z-10">
          {route === "create" ? <CreateImagePage /> : <DownloadPage />}
          {/* {console.log(downloadedRef.current)} */}
        </main>
      </downloadedContext.Provider>
    </div>
  );
}

export default App;
