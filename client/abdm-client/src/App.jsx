import { ApiContextProvider } from "./M1/context/ApiContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./M1/pages/Home";
// import AadhaarOtp from "./M1/components/AadhaarOtp";
import DashbardHome from "./M1/pages/Dashboard/DashbardHome";

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