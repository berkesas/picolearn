import "./custom.scss";
import { HashRouter, Routes, Route } from "react-router-dom";
import NavPanel from "./components/NavPanel";
import Main from "./pages/Main";
import appData from "./data/data.json";
import { DataContext } from "./DataContext.js";

function App() {
  return (
    <DataContext.Provider value={appData}>
      <HashRouter>
        <div className="App">
          <header className="App-header">
            <NavPanel />
          </header>
          <Routes basename={"/"}>
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </HashRouter>
    </DataContext.Provider>
  );
}

export default App;
