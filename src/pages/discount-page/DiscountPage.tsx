import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import Header from '../../sections/header/Header';
import DiscountService from '../../services/discount/discount.service';
import { Discount } from '../../services/discount/discount.typings';
import PeriodicDataTable from '../../components/periodic-data-chart/PeriodicDataChart';
import { TableData } from '../../components/periodic-data-chart/PeriodicDataChart.typings';
import { useDispatch, useSelector } from 'react-redux';
import { DiscountState, loadSimpleDiscounts } from '../../state/discounts/discounts.slice';
import { AppDispatch } from '../../state/store';
import { setActivePage } from '../../state/page/page.slice';
import PageLayout from '../../components/PageLayout/page-layout';


function DiscountPage() {

    const { cik } = useParams();
    const [ selectedDiscount, setSelectedDiscount ] = useState<Discount>();
    const [ dataSets, setDataSets ] = useState<TableData[]>([]);
    const discounts = useSelector< { discounts: DiscountState }, SimpleDiscount[]>((state) => state.discounts.discounts);
    // const loading = useSelector< { discounts: DiscountState }, boolean>((state) => state.discounts.loading);
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        dispatch(setActivePage('Discount'));
        // See if simple discount list needs to be loaded
        if (!discounts || discounts.length === 0) {
          dispatch(loadSimpleDiscounts());
        }

        // Fetch selected discount information
        if (cik) {
          DiscountService.getDiscount(cik).subscribe(discount => {
            setSelectedDiscount(discount);
          })
        }
      }, []);

      useEffect(() => {
        setDataSets(buildDataSets());
      }, [ selectedDiscount ]);

    const buildDataSets = (): TableData[] => {
      const result: TableData[] = [];
      if (selectedDiscount) {
        const data = selectedDiscount.stickerPrice.input;
        result.push({ label: 'Annual Book Value per Share', periodicData: data.annualBVPS });
        result.push({ label: 'Annual Earnings per Share', periodicData: data.annualEPS });
        result.push({ label: 'Annual Equity', periodicData: data.annualEquity });
        result.push({ label: 'Annual Operating Cash Flow', periodicData: data.annualOperatingCashFlow });
        result.push({ label: 'Annual Revenue', periodicData: data.annualRevenue });
        result.push({ label: 'Annual Return on Invested Capital', periodicData: data.annualROIC });
      }
      return result;
    }

    return (
      <PageLayout sections={[
        <Header key={'discounts-header'} text='Discounts' subtext='Company valuations and related data'/>,
        ...dataSets.map(dataSet =>
            <PeriodicDataTable key={ dataSet.label } tableData={ dataSet } span={'ALL'}/>)
      ]}/>
    )
}
  
export default DiscountPage