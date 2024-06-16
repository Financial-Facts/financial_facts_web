import { ReactElement } from 'react';
import ButtonOptionList from "../button-option-list/ButtonOptionList";
import './ButtonOptionSideNav.scss';

export type Orientation = 'vertical' | 'horizontal';

export interface ButtonSideNavConfigItem<T extends string> {
    label: string,
    keys: T[],
    selectedKey: T | undefined,
    selectedKeySetter: (_: T) => void,
    includeSearch?: boolean,
    isScrollable?: boolean,
    displayCondition?: boolean,
    deselectable?: boolean,
    isFoldable?: boolean,
    onFoldedElement?: JSX.Element
}

export interface ButtonOptionSideNavProps {
    buttonOptionSideNavConfig: ButtonSideNavConfigItem<any>[],
    orientation: Orientation
    refSetter?: React.MutableRefObject<HTMLDivElement | null>
}

function ButtonOptionSideNav({ buttonOptionSideNavConfig, orientation, refSetter }: ButtonOptionSideNavProps) {

    const renderScrollableNavSection = (config: ButtonSideNavConfigItem<any>) =>
        <div className='data-selection-box' key={config.label}>
            <ButtonOptionList <string>
                keys={ config.keys }
                setter={ config.selectedKeySetter }
                title={ config.label }
                selectedKey={ config.selectedKey }
                orientation={ orientation }
                includeSearch={ config.includeSearch }
                deselectable={ config.deselectable }
                isScrollable={ config.isScrollable }/>
        </div>;

    const renderStaticNavSection = (config: ButtonSideNavConfigItem<any>, index: number) =>
        <div className='side-nav-options-wrapper' key={config.label}>
            <ButtonOptionList <string>
                key={`button-option-list-${index + 1}`}
                keys={ config.keys }
                setter={ config.selectedKeySetter }
                title={ config.label }
                selectedKey={ config.selectedKey }
                orientation={ orientation }
                includeSearch={ config.includeSearch }
                deselectable={ config.deselectable }
                isFoldable={ config.isFoldable }
                onFoldedElement={ config.onFoldedElement }/>
        </div>

    const renderNavSections = () => buttonOptionSideNavConfig
        .reduce<ReactElement[]>((acc, config, index) => {
            if (index !== 0) {
                config.displayCondition = !!buttonOptionSideNavConfig[index - 1].selectedKey;
            }
            if (config.displayCondition !== false && config.keys.length > 0) {
                acc.push(config.isScrollable ?
                    renderScrollableNavSection(config) :
                    renderStaticNavSection(config, index))
            }
            return acc;
        }, []);

    return (
        <div className={`side-nav-wrapper ${orientation}`} ref={refSetter}>
            {
                renderNavSections()
            }
        </div>
    )
  }
  
  export default ButtonOptionSideNav;