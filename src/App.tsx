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
import DiscountPage from './components/pages/discount-page/DiscountPage';
import FactsPage from './components/pages/facts-page/FactsPage';
import MainPage from './components/pages/main-page/MainPage';
import { useEffect } from 'react';
import { setMobile } from './store/mobile/mobile.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';


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

  const dispatch = useDispatch<AppDispatch>();

  const handleWindowSizeChange = () => {
    const screenWidth = window.screen.width;
    dispatch(setMobile(screenWidth < 576));
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener('resize', handleWindowSizeChange);
    return (() => {
      window.removeEventListener('resize', handleWindowSizeChange);
    })
  }, []);

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
