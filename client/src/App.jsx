import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

function App() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      <h1 className="text-center">Games App</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </main>
  );
}

export default App;
