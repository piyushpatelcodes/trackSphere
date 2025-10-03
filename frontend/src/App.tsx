import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import AnalyticsPage from "./pages/Analytics"
function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          {/* Other routes (if any) */}
          <Route path="/" element={<LandingPage />} />
           
         <Route path="/analytics" element={<AnalyticsPage />} /> 
         {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
