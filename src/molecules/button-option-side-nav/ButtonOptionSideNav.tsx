import './ButtonOptionSideNav.scss';
import { initRef } from "../../utilities";
import ButtonOptionList from "../../atoms/button-option-list/ButtonOptionList";
import { ReactElement } from 'react';
import React from 'react';

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

    const renderScrollableNavSection = (config: ButtonSideNavConfigItem<any>, index: number) =>
        <React.Fragment key={`button-option-list-${index + 1}`}>
            <span className='divider-text'>{ config.label }</span>
            <div className='data-selection-box'>
                <ButtonOptionList <string>
                    keys={ config.keys }
                    setter={ config.selectedKeySetter }
                    selectedKey={ config.selectedKey }
                    orientation='vertical'
                    includeSearch={ config.includeSearch }
                    deselectable={config.deselectable}/>
            </div>
        </React.Fragment>;

    const renderStaticNavSection = (config: ButtonSideNavConfigItem<any>, index: number) =>
        <div className='side-nav-options-wrapper' key={config.label}>
            <span className='divider-text'>{ config.label }</span>
            <ButtonOptionList <string>
                key={`button-option-list-${index + 1}`}
                keys={ config.keys }
                setter={ config.selectedKeySetter }
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
                    renderScrollableNavSection(config, index) :
                    renderStaticNavSection(config, index))
            }
            return acc;
        }, []);

    return (
        <div className={`facts-wrapper`} ref={(ref) => initRef(ref, refSetter)}>
            {
                renderNavSections()
            }
        </div>
    )
  }
  
  export default ButtonOptionSideNav;