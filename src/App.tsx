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
import DiscountSelectionPage from './components/pages/discount-selection-page/DiscountSelectionPage';
import FactsPage from './components/pages/facts-page/FactsPage';
import MainPage from './components/pages/main-page/MainPage';
import { useEffect } from 'react';
import { MobileSize, setMobile } from './store/mobile/mobile.slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store';
import DiscountDataPage from './components/pages/discount-data-page/DiscountDataPage';
import AboutPage from './components/pages/about-page/AboutPage';
import OnNavigation from './hooks/onNavigation';


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
    const screenWidth = window.visualViewport ?
      window.visualViewport.width :
      window.innerWidth;
    const mobileSize: MobileSize | undefined =
      screenWidth < 576 ? 'SMALL' :
      screenWidth < 768 ? 'MEDIUM' :
      screenWidth < 1024 ? 'LARGE' :
      undefined;
    dispatch(setMobile({
      mobile: !!mobileSize,
      size: mobileSize
    }));
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
      <OnNavigation/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/discounts" element={<DiscountSelectionPage/>}/>
        <Route path="/discounts/:cik" element={<DiscountDataPage/>}/>
        <Route path='/facts' element={<FactsPage/>}>
          <Route path=":cik" element={<FactsPage/>}/>
          <Route path=":cik/:taxonomy" element={<FactsPage/>}/>
          <Route path=":cik/:taxonomy/:selectedDataKey" element={<FactsPage/>}/>
        </Route>
        <Route path='/about' element={<AboutPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App
