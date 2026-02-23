import BenchmarkRatioDefinitionBlock from "../components/atoms/benchmark-ratio-definition-block/BenchmarkRatioDefinitionBlock";
import DiscountDefinitionBlock from "../components/atoms/discount-definition-block/DiscountDefinitionBlock";
import DiscountedCashFlowDefinitionBlock from "../components/atoms/discounted-cash-flow-definition-block/DiscountedCashFlowDefinitionBlock";
import StickerPriceDefinitionBlock from "../components/atoms/sticker-price-definition-block/StickerPriceDefinitionBlock";
import { environment } from "../environment";

export const CONSTANTS = {
    DEBOUNCE_TIME: 300,
    IDENTITY_BATCH_SIZE: 100,
    SEARCH_SCROLL_FETCH_THRESHOLD: 80,
    EMPTY: '',
    SPACE: ' ',
    SPAN_YEARS: {
        'TTM': 365,
        'T3Y': 1095,
        'TFY': 1825,
        'TTY': 3650
    },
    TAG_NAME: {
        ANCHOR: 'A',
        PATH: 'path',
        DIALOG: 'DIALOG'
    },
    PROJECTED: 'projected',
    BLOCK_CONFIGS: {
        DISCOUNT: {
            iconSource: '/assets/discount-icon.svg',
            title: 'Discounts',
            link: {
                label: 'View all',
                url: '/discounts'
            },
            content: <DiscountDefinitionBlock/>
        },
        STICKER_PRICE: {
            iconSource: '/assets/sticker-price-logo.svg',
            title: 'Sticker Price',
            link: {
                label: 'Official Rule #1 Website',
                url: environment.ruleNumberOneLink,
                newTab: true
            },
            content: <StickerPriceDefinitionBlock/>
        },
        DISCOUNTED_CASH_FLOW: {
            iconSource: '/assets/discounted-cash-flow-logo.svg',
            title: 'Discounted Cash Flow Price',
            link: {
                label: 'Financial Modeling Prep DCF',
                url: environment.financialModelingPrepDCFLink,
                newTab: true
            },
            content: <DiscountedCashFlowDefinitionBlock/>
        },
        BENCHMARK_RATIO: {
            iconSource: '/assets/brp-logo.svg',
            title: 'Benchmark Ratio Price',
            link: {
                label: 'Average P/S Ratio by Industry',
                url: environment.benchmarkRatioLink,
                newTab: true
            },
            content: <BenchmarkRatioDefinitionBlock/>
        }
    }
}