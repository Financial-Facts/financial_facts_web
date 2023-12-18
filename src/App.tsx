import DiscountPage from "./pages/discount-page/DiscountPage";
import MainPage from "./pages/main-page/MainPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/discount" element={<DiscountPage/>}>
          <Route path=":cik" element={<DiscountPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
