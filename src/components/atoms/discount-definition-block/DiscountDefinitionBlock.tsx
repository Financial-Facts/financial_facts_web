function DiscountDefinitionBlock() {
    return <div className='definition-block-contents'>
        <span>
            A publicly traded company that has been successfully evaluated. This requires that the following criteria be met over the past 10 years.
        </span>
        <label htmlFor='criteria' className='list-title'>
            The following values must be 10% or greater
        </label>
        <ul id='criteria' className='list'>
            <li>Average annual return on invested capital (ROIC)</li>
            <li>Average annual revenue growth</li>
            <li>Average annual earnings per share (EPS) growth</li>
            <li>Average annual equity growth</li>
            <li>Average annual operating cash flow growth</li>
        </ul>
    </div>
}

export default DiscountDefinitionBlock;