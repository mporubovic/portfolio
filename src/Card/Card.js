import './Card.css'
import {useState} from "react";

export default function Card(props) {
    const id = props.id
    const stackSpacing = 50
    const [offset, setOffset] = useState(props.stackPosition*stackSpacing)

    const [prevPosition, setPrevPosition] = useState(props.stackPosition)

    const stackRotation = '30,-6,18,45deg'
    const tiltRotation = '30,-6,18,20deg'

    const stackTransition = 'transform 0.25s, opacity 0.25s'
    const boardTransition = 'transform 1s, width 1s, height 1s'
    // const boardTransition = 'all 5s'

    const stackOpacity = 0.5

    const defaultStyle = {
        width: '150px',
        height: '150px',
        transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
        transition: stackTransition,
        opacity: stackOpacity,
        zIndex: 10 + id,
    }

    const [style, setStyle] = useState(defaultStyle)
    const [state, setState] = useState("stack")


    switch (state) {
        case "stack":
            if (props.isActive) setState("before-stack-to-board")

            if (props.stackPosition !== prevPosition) {
                setOffset(props.stackPosition*stackSpacing)
                setPrevPosition(props.stackPosition)

                setStyle({
                    ...style,
                    transform: `translate(${props.stackState.x}px, ${props.stackState.y - props.stackPosition*stackSpacing}px) rotate3d(${stackRotation})`
                })
            }
            break

        case "stack-to-tilt":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${tiltRotation})`,
                opacity: 1
            })
            setState("tilt")
            break

        case "tilt":
            if (props.isActive) setState("before-stack-to-board")
            break

        case "tilt-to-stack":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
                opacity: stackOpacity
            })
            setState("stack")
            break

        case "stack-to-new-position":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
            })
            break

        case "before-stack-to-board":
            setStyle({
                ...style,
                transition: boardTransition
            })

            setState("go-stack-to-board")
            break

        case "go-stack-to-board":
            setStyle({
                ...style,
                width: '70%',
                height: '100%',
                zIndex: 1,
                transform: 'translate(0px, 0px) translateZ(-1000px)',
            })
            setState("stack-to-board")
            break

        case "stack-to-board":
            if (!props.isActive) setState("before-board-to-stack")
            break

        case "before-board":
            setState("board")
            break

        case "board":
            if (!props.isActive) setState("before-board-to-stack")
            break

        case "before-board-to-stack":
            setPrevPosition(0)
            setStyle({
                ...style,
                width: '150px',
                height: '150px',
                transform: `translate(${props.stackState.x}px, ${props.stackState.y}px) rotate3d(${stackRotation})`, // go to bottom first
                zIndex: 10 + id,
                opacity: stackOpacity
            })
            setState("board-to-stack")
            break

        case "board-to-stack":
            break

        case "before-stack":
            setStyle({
                ...style,
                transition: stackTransition
            })
            setState("stack")
            break

        default:
            break
    }


    return (
        <div className="Card"
             style={style}
             onClick={() => {
                 if (state === "stack" || state === "tilt") {
                     props.clickHandler()
                 }
             }}
             onMouseEnter={() => state === "stack" && setState("stack-to-tilt")}
             onMouseLeave={() => state === "tilt" && setState("tilt-to-stack")}
             onTransitionEnd={() => {
                 switch (state) {
                     case "stack-to-board":
                         setState("before-board")
                         break
                     case "board-to-stack":
                         setState("before-stack")
                         break
                     default:
                         break
                 }

             }}
        >
            {id}
        </div>
    )
}