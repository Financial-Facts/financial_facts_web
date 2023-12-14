import DiscountPage from "./pages/discount-page/DiscountPage";
import MainPage from "./pages/main-page/MainPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="discount/:cik" element={<DiscountPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
