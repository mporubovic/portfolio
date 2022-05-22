import './Card.css'
import {useEffect, useRef, useState} from "react";

export default function Card(props) {
    const id = props.id
    const stackSpacing = 35

    const stackRotation = '30,-6,18,45deg'
    const previewDistance = 15

    const stackTransition = 'transform 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
    const previewTransition = 'transform 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
    const boardTransition = 'all 1.5s'

    const dimOpacity = 0.35
    const stackOpacity = 1

    const [opacity, setOpacity] = useState(0)
    const [zIndex, setZIndex] = useState(0)
    // const [transform, setTransform] = useState("")
    const [transition, setTransition] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [rotation, setRotation] = useState("")

    const [stackPosition, setStackPosition] = useState(0)
    // const [prevStackPosition, setPrevStackPosition] = useState(0)
    const [dim, setDim] = useState(false)

    const drag = useRef({x: 0, y: 0})

    const [state, _setState] = useState("initial")
    const stateRef = useRef(state)
    const setState = (val) => {
        _setState(val)
        stateRef.current = val
    }

    const [transitionEnded, setTransitionEnded] = useState(false)

    const [pointer, _setPointer] = useState("out")
    const pointerRef = useRef(pointer)
    const setPointer = (val) => {
        lastPointer.current = pointerRef.current
        pointerRef.current = val
        _setPointer(val)
    }
    const lastPointer = useRef("")

    const states = {
        "initial": () => {
            setOpacity(1)
            setZIndex(10 + props.stackPosition)
            setWidth("170px")
            setHeight("170px")

            setX(props.stackState.x)
            setY(props.stackState.y - props.stackPosition*stackSpacing)
            setRotation(stackRotation)
            setStackPosition(props.stackPosition)
            setTransition(stackTransition)

            setState("stack")
        },

        "stack": () => {
            if (pointer === "move" && !props.locked) {
                setPointer("in")
                setTransition(previewTransition)
                setX(x - previewDistance)
                setY(y + previewDistance)
                setState("stack-to-preview")
            }

            if (props.stackPosition !== stackPosition) {
                setStackPosition(props.stackPosition)
                // setTransition(stackTransition)
                setY(props.stackState.y - props.stackPosition*stackSpacing)
                setZIndex(10 + props.stackPosition)
            }

            if (transitionEnded) {
                setTransitionEnded(false)
            }

        },

        "stack-to-preview": () => {
            if (pointer === "down") {
                setPointer("in") // maybe in ?

                props.clickHandler()
                props.lock()

                setTransition(boardTransition)
                setX(0)
                setY(0)
                setZIndex(1)
                setRotation("0,0,0,0")
                setWidth("80%")
                setHeight("100%")

                setState("preview-to-board")
                return
            }

            if (transitionEnded) {
                setTransitionEnded(false)
                setState("preview")
            }
        },

        "preview": () => {
            if (pointer === "out") {
                setX(x + previewDistance)
                setY(y - previewDistance)
                setState("preview-to-stack")
            }

            if (props.stackPosition !== stackPosition) {
                setStackPosition(props.stackPosition)
                setZIndex(10 + props.stackPosition)
            }


            if (pointer === "up" && !props.locked) {
                setPointer("in") // maybe in ?

                props.clickHandler()
                props.lock()

                setTransition(boardTransition)
                setX(0)
                setY(0)
                setZIndex(1)
                setRotation("0,0,0,0")
                setWidth("80%")
                setHeight("100%")

                setState("preview-to-board")
            }

            if (pointer === "move" && lastPointer.current === "down") {
                // setPointerDown(false)
                setState("preview-to-drag")
            }
        },

        "drag": () => {
            if (pointer === "up") {
                setPointer("out")

                props.unlock()

                setTransition(stackTransition)
                setX(props.stackState.x)
                setY(props.stackState.y - stackPosition*stackSpacing)

                setState("drag-to-stack")
            }

            if (props.stackPosition !== stackPosition) {
                setStackPosition(props.stackPosition)
                setZIndex(10 + props.stackPosition)
            }

            if (pointer === "move") {
                setPointer("down")

                let dx = x + drag.current.x - props.stackState.x
                let dy = y + drag.current.y - props.stackState.y - previewDistance

                setX(x + drag.current.x)
                setY(y + drag.current.y)

                drag.current = {x:0, y:0}

                let dyRelative = dy + stackPosition*stackSpacing

                if (Math.abs(dyRelative) > stackSpacing) {
                    props.shift(dyRelative > 1 ? -1 : 1)
                }

            }
        },

        "drag-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setState("stack")
            }
        },

        "preview-to-drag": () => {
            props.lock()
            setTransition("")
            setState("drag")
        },

        "preview-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setTransition(stackTransition)
                setState("stack")
            }
        },

        "preview-to-board": () => {
            // debugger
            if (transitionEnded) {
                setTransitionEnded(false)
                props.unlock()
                setState("board")
            }
        },

        "board": () => {
            if (!props.isActive) {
                // setOpacity(1)
                // setZIndex(10 + stackPosition)
                setZIndex(10 + props.stackPosition)
                setWidth("170px")
                setHeight("170px")

                setX(props.stackState.x)
                // setY(props.stackState.y - stackPosition*stackSpacing)
                setY(props.stackState.y - props.stackPosition*stackSpacing)
                setRotation(stackRotation)

                setState("board-to-stack")
            }

        },

        "board-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setTransition(stackTransition)
                setState("stack")
            }
        }

    }

    function pointerMoveHandler(event) {
        if (stateRef.current === "drag") {
            setPointer("move")
            drag.current = {x: event.movementX, y: event.movementY}
        } else if (["in", "down"].indexOf(pointerRef.current) > - 1) {
            setPointer("move")
        }
    }

    function pointerUpHandler() {
        if (["drag", "preview"].indexOf(stateRef.current) > -1) setPointer("up")
    }

    useEffect(() => {
        window.addEventListener("pointermove", pointerMoveHandler)
        window.addEventListener("pointerup", pointerUpHandler)

        return () => {
            window.removeEventListener("pointermove", pointerMoveHandler)
            window.removeEventListener("pointerup", pointerUpHandler)
        }
    }, [])

    useEffect(() => {
        console.log(`Card ${id} re-rendered to state: ${state}`)
        states[state]()
    })


    return (
        <div className="Card"
             // style={style}
             style={{
                 transform: `translate(${x}px, ${y}px) rotate3d(${rotation})`,
                 width: width,
                 height: height,
                 opacity: opacity,
                 zIndex: zIndex,
                 transition: transition,
                 ...props.content.background
             }}

             onPointerEnter={() => {
                 if (pointer !== "in") setPointer("in")
             }}

             onPointerDown={() => {
                 if (pointer !== "down") setPointer("down")
             }}

             onPointerLeave={() => {
                 if (pointer !== "out") setPointer("out")
             }}

             onTransitionEnd={() => {
                 setTransitionEnded(true)
             }}
        >

            <div className="body">

            </div>


            <div className="bottom">
                <div className="wrapper">
                    {id} {props.content.text}
                </div>
            </div>
        </div>
    )
}