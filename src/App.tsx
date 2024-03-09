import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';import DiscountPage from "./pages/discount-page/DiscountPage";
import MainPage from "./pages/main-page/MainPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FactsPage from './pages/facts-page/FactsPage';
import ApiDocsPage from './pages/api-docs-page/ApiDocsPage';

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
        <Route path='/api' element={<ApiDocsPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
