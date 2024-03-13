import './ButtonOptionSideNav.scss';
import { initRef } from "../../utilities";
import ButtonOptionList from "../ButtonOptionList/ButtonOptionList";

export interface ButtonSideNavConfigItem<T extends string> {
    label: string,
    keys: T[],
    selectedKey: T | undefined,
    selectedKeySetter: (_: T | undefined) => void
}

export interface ButtonOptionSideNavProps<T extends string> {
    buttonOptionSideNavConfig: ButtonSideNavConfigItem<T>[],
    refSetter?: (_: HTMLElement) => void
}


function ButtonOptionSideNav<T extends string>({ buttonOptionSideNavConfig, refSetter }: ButtonOptionSideNavProps<T>) {

    const renderNavSections = () => {
        return buttonOptionSideNavConfig.map(config => 
            <div className='side-nav-options-wrapper' key={config.label}>
                <span className='divider-text'>{ config.label }</span>
                <ButtonOptionList <T>
                    keys={ config.keys }
                    setter={ config.selectedKeySetter }
                    selectedKey={ config.selectedKey }
                    orientation='vertical'/>
            </div>);
    }

    return (
        <div className={`facts-wrapper`} ref={(ref) => initRef(ref, refSetter)}>
            {
                renderNavSections()
            }
        </div>
    )
  }
  
  export default ButtonOptionSideNav;