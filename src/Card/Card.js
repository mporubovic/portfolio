import './Card.css'
import {useEffect, useRef, useState} from "react";

import AboutMe from "../Cards/AboutMe/AboutMe";

const components = {
    AboutMe: AboutMe
}

export default function Card(props) {
    const id = props.id
    const stackSpacing = 35

    const stackRotation = '30,-6,18,45deg'
    const previewDistance = 15

    const stackTransition = 'transform 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
    const previewTransition = 'transform 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
    // const boardTransition = 'all 1.5s'
    const boardTransition = 'width 1.5s, height 1.5s, transform 1.5s'

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
    const [z, setZ] = useState(0)
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

    const [backgroundBlur, setBackgroundBlur] = useState("")

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
                // props.preview()
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

            if (props.dim !== dim) {
                setDim(props.dim)
                setOpacity(props.dim ? dimOpacity : stackOpacity)
            }

        },

        "stack-to-preview": () => {
            if (pointer === "down") {
                setPointer("in") // maybe in ?

                props.clickHandler()
                props.lock()

                setTransition(boardTransition)
                setX(20)
                setY(20)
                setZIndex(1000)
                setZ(-1000)
                setRotation(null)
                setWidth("80%")
                setHeight("95%")

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
                // props.unpreview()
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
                setX(20)
                setY(20)
                setZIndex(1000)
                setZ(-1000)
                setRotation(null)
                setWidth("80%")
                setHeight("95%")


                setState("preview-to-board")
            }

            if (pointer === "move" && lastPointer.current === "down") {
                // setPointerDown(false)
                // props.unpreview()
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
                // setZIndex(100)
                setBackgroundBlur("10px")
                setZIndex(1)
                setState("board")
            }
        },

        "board": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
            }

            if (!props.isActive) {
                // setOpacity(1)
                // setZIndex(10 + stackPosition)
                setTransition(boardTransition)
                setZIndex(10 + props.stackPosition)
                setWidth("170px")
                setHeight("170px")
                setZ(0)

                setX(props.stackState.x)
                // setY(props.stackState.y - stackPosition*stackSpacing)
                setY(props.stackState.y - props.stackPosition*stackSpacing)
                setRotation(stackRotation)
                // setBackgroundBlur("")

                setState("board-to-stack")
            }

        },

        "board-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setTransition(stackTransition)
                setBackgroundBlur("")
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

    const CardContent = components[props.content.component]


    return (
        <div className="Card"
             style={{
                 transform: `translate(${x}px, ${y}px) ${rotation ? `rotate3d(${rotation})` : ""} ${z ? `translateZ(${z}px)` : ""}`,
                 // transform: `translate(${x}px, ${y}px) ${rotation ? `rotate3d(${rotation})` : ""}`,
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

             onTransitionEnd={(e) => {
                 if (e.propertyName !== "backdrop-filter") setTransitionEnded(true)
             }}
        >

            <div className="body" style={{
                // backdropFilter: `blur(${backgroundBlur})`
            }}>
                <div className="content">
                    { props.content.component && (<CardContent />)}
                </div>
            </div>


            <div className="bottom">
                <div className="wrapper">
                    {id} {props.content.text}
                </div>
            </div>
        </div>
    )
}