import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      
      <BrowserRouter>
     
          <Routes>
        
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            
          </Routes>
   
    </BrowserRouter>
    </>
  )
}