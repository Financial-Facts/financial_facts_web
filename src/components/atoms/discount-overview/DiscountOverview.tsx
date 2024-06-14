import { useSelector } from 'react-redux';
import FormatService from '../../../services/format/format.service';
import { MobileState } from '../../../store/mobile/mobile.slice';
import { Discount } from '../../../types/discount.typings';
import LinearLoopAnimation from '../linear-loop-animation/LinearLoopAnimation';
import './DiscountOverview.scss';

export interface DiscountOverProps {
    discount: Discount | null
}

function DiscountOverview({ discount }: DiscountOverProps) {

    const mobile = useSelector<{ mobile: MobileState }, MobileState>((state) => state.mobile);

    const getClassName = (price: number, marketPrice: number): string => {
        return price < marketPrice ?
            'priced-under' :
            'priced-over' 
    }

    return (
        <div className='discount-overview'>
            {
                !!discount &&
                    <LinearLoopAnimation
                        element={
                            <div className='price-list'>
                                <div className='price-item'>
                                    <span className='title'>
                                        { mobile.mobile ? 'Sticker' : 'Sticker Price' }
                                    </span>
                                    <span className={`value ${getClassName(discount.stickerPrice.price, discount.marketPrice)}`}>
                                        { FormatService.formatToDollarValue(discount.stickerPrice.price) }
                                    </span>
                                </div>
                                <div className='price-item'>
                                    <span className='title'>
                                        { mobile.mobile ? 'DCF' : 'Discounted Cash Flow' }
                                    </span>
                                    <span className={`value ${getClassName(discount.discountedCashFlowPrice.price, discount.marketPrice)}`}>
                                        { FormatService.formatToDollarValue(discount.discountedCashFlowPrice.price) }
                                    </span>
                                </div>
                                <div className='price-item'>
                                    <span className='title'>
                                        { mobile.mobile ? 'BR' : 'Benchmark Ratio' }
                                    </span>
                                    <span className={`value ${getClassName(discount.benchmarkRatioPrice.price, discount.marketPrice)}`}>
                                        { FormatService.formatToDollarValue(discount.benchmarkRatioPrice.price) }
                                    </span>
                                </div>
                                <div className='price-item'>
                                    <span className='title'>
                                        { mobile.mobile ? 'Market' : 'Market Price' }
                                    </span>
                                    <span className='value'>{ FormatService.formatToDollarValue(discount.marketPrice) }</span>
                                </div>
                            </div>
                        }/>
            }
        </div>
    )
}

export default DiscountOverview;