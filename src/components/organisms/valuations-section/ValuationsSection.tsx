import DropdownInformationList from '../../atoms/dropdown-information-list/DropdownInformationList';
import StickerPriceDefinition from '../../molecules/sticker-price-definition/StickerPriceDefinition';
import DcfPriceDefinition from '../../molecules/dcf-price-definition/DcfPriceDefinition';
import BrPriceDefinition from '../../molecules/br-price-definition/BrPriceDefinition';

function ValuationsSection() {

    return (
        <DropdownInformationList
            title={'Valuations'}
            listItem={<>
                <StickerPriceDefinition/>
                <DcfPriceDefinition/>
                <BrPriceDefinition/>
            </>}/>
    )
}

export default ValuationsSection;