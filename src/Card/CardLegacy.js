import './Card.css'
import {useEffect, useRef, useState} from "react";

export default function CardLegacy(props) {
    const id = props.id
    const stackSpacing = 35
    const [offset, _setOffset] = useState(props.stackPosition*stackSpacing)
    const offsetRef = useRef(offset)

    function setOffset(val) {
        offsetRef.current = val
        _setOffset(val)
    }

    const [prevPosition, setPrevPosition] = useState(props.stackPosition)
    const [prevDim, setPrevDim] = useState(props.dim)

    const stackRotation = '30,-6,18,45deg'
    const previewDistance = 15

    const stackTransition = 'transform 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
    const dragTransition = 'transform 0.5s, opacity 0.5s'
    const boardTransition = 'transform 1s, width 1s, height 1s'

    const dimOpacity = 0.35
    const stackOpacity = 1

    const defaultStyle = {
        width: '170px',
        height: '170px',
        transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
        transition: stackTransition,
        opacity: stackOpacity,
        // background: `linear-gradient(150deg, ${props.content.colorA}, ${props.content.colorB})`,
        // backgroundImage: `url(${background})`,
        zIndex: 10 + props.stackPosition,
        ...props.content.background
    }

    const [style, setStyle] = useState(defaultStyle)
    const styleRef = useRef(style)
    // const setStyle = (val) => {
    //     stateRef.current = val
    //     _setStyle(val)
    // }

    const [state, _setState] = useState("stack")
    const stateRef = useRef(state)

    function setState(val) {
        stateRef.current = val
        _setState(val)
    }

    const pointerDown = useRef(false)
    const dragging = useRef(false)

    const drag = useRef({x: 0, y: 0})

    function handlePointerMove(event) {
        if (pointerDown.current) {

            if (!dragging.current) {
                dragging.current = true
                // console.log(styleRef.current.transition)
                props.lock()
                props.unpreview()
                setState("stack-to-drag")

                return
            }

            let x = drag.current.x + event.movementX
            let y = drag.current.y + event.movementY

            drag.current = {x: x, y: y}

            if (Math.abs(y) > stackSpacing) {
                if (props.shift(-y > 1 ? 1 : -1)) drag.current = {x: drag.current.x, y: 0}
            }

            // dragging.current && setStyle({
            // console.log(styleRef.current.transition)
            setStyle({
                ...style,
                opacity: 1,
                zIndex: 10 + Math.floor(offsetRef.current / stackSpacing),
                transition: "",
                transform: `translate(${props.stackState.x - previewDistance + x}px, ${props.stackState.y + previewDistance - offsetRef.current + (y)}px) rotate3d(${stackRotation})`
            })
        }
    }

    function handlePointerUp(event) {
        // console.log(stateRef.current, drag.current.x, stateRef.current === "drag" && drag.current.x < -100, id)
        // if (id === 6) console.log("up")
        if (stateRef.current === "drag" && drag.current.x < -100) {
            // debugger
            drag.current = {x: 0, y: 0}
            pointerDown.current = false
            dragging.current = false
            props.unlock()
            props.clickHandler()
        }
        else if (stateRef.current === "drag") {
            drag.current = {x: 0, y: 0}
            dragging.current = false
            setState("before-drag-to-stack")
            props.unlock()
            pointerDown.current = false
        }
        else if (["preview", "stack-to-preview"].indexOf(stateRef.current) > -1) {
            props.clickHandler()
        }

    }



    useEffect(() => {
        window.addEventListener("pointermove", handlePointerMove)
        window.addEventListener("pointerup", handlePointerUp)
        return () => {
            window.removeEventListener("pointermove", handlePointerMove)
            window.removeEventListener("pointerup", handlePointerUp)
        }
    }, [])

    if (props.stackPosition !== prevPosition) {
        setOffset(props.stackPosition * stackSpacing)
        setPrevPosition(props.stackPosition)
    }

    switch (state) {
        case "stack":
            if (props.isActive) setState("before-stack-to-board")

            if (props.stackPosition !== prevPosition) {
                setOffset(props.stackPosition*stackSpacing)
                setPrevPosition(props.stackPosition)

                setStyle({
                    ...style,
                    transform: `translate(${props.stackState.x}px, ${props.stackState.y - props.stackPosition*stackSpacing}px) rotate3d(${stackRotation})`,
                    opacity: stackOpacity,
                    zIndex: 10 + props.stackPosition
                })
            }

            if (props.dim !== prevDim) {
                setPrevDim(props.dim)
                setStyle({
                    ...style,
                    opacity: props.dim ? dimOpacity : stackOpacity
                })
            }
            break

        case "before-stack-to-preview":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x - previewDistance}px, ${props.stackState.y - offset + previewDistance}px) rotate3d(${stackRotation})`,
                opacity: 1,
                // cursor: "move",
            })
            setState("stack-to-preview")

            break

        case "stack-to-preview":
            break

        case "before-preview":


        case "preview":
            if (props.isActive) setState("before-stack-to-board")
            break

        case "before-preview-to-stack":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
                opacity: prevDim ? dimOpacity : stackOpacity
            })
            setState("preview-to-stack")
            break

        case "preview-to-stack":
            break

        case "stack-to-new-position":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - offset}px) rotate3d(${stackRotation})`,
            })
            break

        case "stack-to-drag":
            setStyle({
                ...style,
                transition: "",
            })
            setState("drag")
            break

        case "drag":
            if (props.stackPosition !== prevPosition) {
                setOffset(props.stackPosition * stackSpacing)
                setPrevPosition(props.stackPosition)
            }
            if (props.isActive) setState("before-stack-to-board")
            break

        case "before-drag-to-stack":
            setStyle({
                ...style,
                transform: `translate(${props.stackState.x}px, ${props.stackState.y - props.stackPosition*stackSpacing}px) rotate3d(${stackRotation})`,
                transition: dragTransition,
                opacity: stackOpacity,
                zIndex: 10 + props.stackPosition
            })
            setState("drag-to-stack")
            break

        case "drag-to-stack":
            break


        case "before-stack-to-board":
            setStyle({
                ...style,
                transition: boardTransition
            })

            pointerDown.current = false

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
            if (props.stackPosition !== prevPosition) {
                setOffset(props.stackPosition * stackSpacing)
                setPrevPosition(props.stackPosition)
            }
            break

        case "before-board-to-stack":
            setStyle({
                ...defaultStyle,
                transition: boardTransition,
                zIndex: 999,
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
            alert("wrong state")
            break
    }


    return (
        <div className="Card"
             style={style}

             onPointerDown={() => {
                 if (["stack", "preview"].indexOf(state) > -1) {
                     pointerDown.current = true
                 }
             }}

             onMouseMove={() => {
                 if (!props.locked && state === "stack") {
                     props.preview()
                     setState("before-stack-to-preview")
                 }
             }}
             onMouseLeave={() => {
                 if (["preview", "stack-to-preview"].indexOf(state) > -1) {
                     props.unpreview()
                     setState("before-preview-to-stack")
                 }
             }}
             onTransitionEnd={() => {
                 switch (state) {
                     case "stack-to-board":
                         setState("before-board")
                         break
                     case "board-to-stack":
                         setState("before-stack")
                         break
                     case "stack-to-preview":
                         setState("preview")
                         break
                     case "preview-to-stack":
                         setState("stack")
                         break
                     case "drag-to-stack":
                         setState("before-stack")
                         break
                     default:
                         break
                 }

             }}
        >
            {id}


            <div className="label">
                <div className="wrapper">
                    {props.content.text}
                </div>
            </div>
        </div>
    )
}