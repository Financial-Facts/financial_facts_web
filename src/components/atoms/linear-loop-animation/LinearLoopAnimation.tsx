import './LinearLoopAnimation.scss';

export interface LinearLoopAnimationProps {
    element: JSX.Element
}

function LinearLoopAnimation({ element }: LinearLoopAnimationProps) {

    return(
        <div className="linear-loop-animated-wrapper">
            { element }
            { element }
        </div>
    )

}

export default LinearLoopAnimation;