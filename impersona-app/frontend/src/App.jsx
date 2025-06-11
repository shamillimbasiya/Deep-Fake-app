import "./App.css";
import AppTheme from "./shared-theme/AppTheme";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FaceReenactment from "./FaceReenactment";
import Home from "./Home";
import VoiceoverVideo from "./VoiceoverVideo";
import NoPage from "./NoPage";

function App() {
  return (
    <div className="App">
      {/* <MarketingPage /> */}
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AppTheme>
          <CssBaseline enableColorScheme />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voiceover-video" element={<VoiceoverVideo />} />
            <Route path="/face-reenactment" element={<FaceReenactment />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </AppTheme>
      </BrowserRouter>
    </div>
  );
}

export default App;
