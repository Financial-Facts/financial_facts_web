import { useParams } from 'react-router-dom';
import './DiscountPage.scss'
import { useEffect, useState } from 'react';
import BulkEntitiesService from '../../services/bulk-entities/bulk-entities.service';
import { SimpleDiscount } from '../../services/bulk-entities/bulk-entities.typings';
import { catchError } from 'rxjs';
import Header from '../../sections/header/Header';
import DiscountService from '../../services/discount/discount.service';
import { Discount } from '../../services/discount/discount.typings';
import PeriodicDataTable from '../../components/periodic-data-table/PeriodicDataTable';
import { TableData } from '../../components/periodic-data-table/PeriodicDataTable.typings';


function DiscountPage() {

    const { cik } = useParams();
    const [ discounts, setDiscounts ] = useState([] as SimpleDiscount[]);
    const [ loading, setLoading ] = useState(false);
    const [ selectedDiscount, setSelectedDiscount ] = useState<Discount>();
    const [ dataSets, setDataSets ] = useState([] as TableData[]);

    useEffect(() => {
        fetchDiscounts();
        if (cik) {
          DiscountService.getDiscount(cik).subscribe(discount => {
            setSelectedDiscount(discount);
          })
        }
      }, []);

      useEffect(() => {
        setDataSets(buildDataSets());
      }, [ selectedDiscount ]);
    
    const fetchDiscounts = () => {
        setLoading(true);
        BulkEntitiesService
            .fetchBulkDiscounts()
            .pipe(catchError(err => {
                setLoading(false);
                throw err;
            }))
            .subscribe(bulkEntityResponse => {
                if (bulkEntityResponse.discounts) {
                    setDiscounts(bulkEntityResponse.discounts);
                }
                setLoading(false);
            });
    };

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
      <div className='discount-page'>
        <Header text='Current Discounts' subtext={''}></Header>
        <PeriodicDataTable tableData={ dataSets }></PeriodicDataTable>
      </div>
    )
}
  
export default DiscountPage