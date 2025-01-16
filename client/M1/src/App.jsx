import { ApiContextProvider } from "./context/ApiContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import AadhaarOtp from "./components/AadhaarOtp";
import DashbardHome from "./pages/Dashboard/DashbardHome";

function App() {

  return (
    <Router>
      <ApiContextProvider>
        <Routes>
          <Route path="*" element={'404 Not Found'} />
          <Route exact path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashbardHome />} />
        </Routes>
      </ApiContextProvider>
    </Router>
  )
}

export default App