import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DiscountPage from "./pages/discount-page/DiscountPage";
import FactsPage from './pages/facts-page/FactsPage';
import MainPage from "./pages/main-page/MainPage";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/discount" element={<DiscountPage/>}>
          <Route path=":cik" element={<DiscountPage/>}/>
        </Route>
        <Route path='/facts' element={<FactsPage/>}>
          <Route path=":cik" element={<FactsPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
