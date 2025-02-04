import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./contexts/SocketContext";
import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";

function App() {
  return (
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
