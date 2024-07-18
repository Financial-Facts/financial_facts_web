import './LinearLoopAnimation.scss';

export interface LinearLoopAnimationProps {
    element: JSX.Element,
    duration?: string
    direction?: 'forward' | 'reverse'
}

function LinearLoopAnimation({ element, duration, direction = 'forward' }: LinearLoopAnimationProps) {

    return(
        <div className={`linear-loop-animated-wrapper ${direction}`} style={{
            '-webkit-animation-duration': duration || '40s'
        } as React.CSSProperties}>
            { element }
            { element }
        </div>
    )

}

export default LinearLoopAnimation;