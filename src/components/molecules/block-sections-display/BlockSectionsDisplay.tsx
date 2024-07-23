import { Link } from 'react-router-dom';
import SvgIcon from '../../atoms/svg-icon/SvgIcon';
import './BlockSectionsDisplay.scss';

export interface BlockSection {
    iconSource: string
    title: string
    content: JSX.Element
    link: {
        label: string
        url: string,
        newTab?: boolean
    }
}

export interface BlockSectionDisplayProps {
    blocks: BlockSection[]
} 

function BlockSectionsDisplay({ blocks }: BlockSectionDisplayProps) {

    return <section className='block-sections-display'>
        {
            blocks.map(block => 
                <div className='block' key={block.title}>
                    <div className='block-header'>
                        <SvgIcon 
                            src={block.iconSource}
                            height={'50px'}
                            width={'50px'}
                            color='#8C19D3'/>
                        <span className='block-title'>{ block.title }</span>
                        { block.content }
                    </div>
                    <Link to={block.link.url} className='block-link' target={ block.link.newTab ? '_blank' : '_self' }>{block.link.label}</Link>
                </div>
            )
        }
    </section>
}

export default BlockSectionsDisplay;