import { ReactElement } from 'react';
import ButtonOptionList from "../../atoms/button-option-list/ButtonOptionList";
import './ButtonOptionSideNav.scss';
import { initRef } from '../../../utilities';

export interface ButtonSideNavConfigItem<T extends string> {
    label: string,
    keys: T[],
    selectedKey: T | undefined,
    selectedKeySetter: (_: T) => void,
    includeSearch?: boolean,
    isScrollable?: boolean,
    displayCondition?: boolean,
    deselectable?: boolean
}

export interface ButtonOptionSideNavProps {
    buttonOptionSideNavConfig: ButtonSideNavConfigItem<any>[],
    refSetter?: (_: HTMLDivElement | null) => void
}


function ButtonOptionSideNav({ buttonOptionSideNavConfig, refSetter }: ButtonOptionSideNavProps) {

    const renderScrollableNavSection = (config: ButtonSideNavConfigItem<any>) =>
        <div className='data-selection-box' key={config.label}>
            <ButtonOptionList <string>
                keys={ config.keys }
                setter={ config.selectedKeySetter }
                title={ config.label }
                selectedKey={ config.selectedKey }
                orientation='vertical'
                includeSearch={ config.includeSearch }
                deselectable={config.deselectable}/>
        </div>;

    const renderStaticNavSection = (config: ButtonSideNavConfigItem<any>, index: number) =>
        <div className='side-nav-options-wrapper' key={config.label}>
            <ButtonOptionList <string>
                key={`button-option-list-${index + 1}`}
                keys={ config.keys }
                setter={ config.selectedKeySetter }
                title={ config.label }
                selectedKey={ config.selectedKey }
                orientation='vertical'
                includeSearch={ config.includeSearch }
                deselectable={ config.deselectable }/>
        </div>

    const renderNavSections = () => buttonOptionSideNavConfig
        .reduce<ReactElement[]>((acc, config, index) => {
            if (index !== 0 ) {
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
        <div className={`side-nav-wrapper`} ref={(ref) => initRef(ref, refSetter)}>
            {
                renderNavSections()
            }
        </div>
    )
  }
  
  export default ButtonOptionSideNav;