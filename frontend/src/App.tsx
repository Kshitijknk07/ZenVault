import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth_Page from "./pages/Auth_Page";
import Landing_Page from "./pages/Landing_Page";
import Dashboard_Page from "./pages/Dashboard_Page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth_Page />} />
        <Route path="/" element={<Landing_Page />} />
        <Route path="/dashboard" element={<Dashboard_Page />} />
      </Routes>
    </Router>
  );
}

export default App;
