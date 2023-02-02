import './Card.css'
import {useEffect, useRef, useState} from "react";

export default function Card(props) {
    const id = props.id

    // const dimOpacity = 0.35
    const [mobile, _setMobile] = useState(window.innerWidth <= 500)
    const mobileRef = useRef(mobile)
    const setMobile = (val) => {
        _setMobile(val)
        mobileRef.current = val
    }

    const defaults = {
        stack: {
            xOffset: 210,
            mobile_xOffset: 70,
            yOffset: 200,
            mobile_yOffset: 70,
            spacing: 40,
            mobileSpacing: 35,
            opacity: 0.7,
            width: "170px",
            mobile_width: "50px",
            height: "170px",
            mobile_height: "50px",
            rotation: "30,-6,18,45deg",
            transition: 'transform 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.5s cubic-bezier(0.74,-0.03, 0.25, 0.95)'
        },

        preview: {
            distance: 15,
            mobileDistance: 7,
            opacity: 1,
            transition: 'transform 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95), opacity 0.25s cubic-bezier(0.74,-0.03, 0.25, 0.95)',
        },

        board: {
            width: 0.80,
            mobile_width: 0.95,
            height: 0.95,
            mobile_height: 0.95,
            opacity: 1,
            transition: `width ${mobile ? '1.0' : '1.5'}s, height ${mobile ? '1.0' : '1.5'}s, transform ${mobile ? '1.0' : '1.5'}s`,
        }

    }

    const [opacity, setOpacity] = useState(0)
    const [zIndex, setZIndex] = useState(0)

    const [transition, setTransition] = useState("")
    const [width, setWidth] = useState("")
    const [height, setHeight] = useState("")

    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [z, setZ] = useState(0)
    const [rotation, setRotation] = useState("")

    const [stackPosition, _setStackPosition] = useState(0)
    const stackPositionRef = useRef(0)
    const setStackPosition = (val) => {
        stackPositionRef.current = val
        _setStackPosition(val)
    }
    const [dim, setDim] = useState(false)

    const dragDelta = useRef({x: 0, y: 0})

    const [state, _setState] = useState("initial")
    const stateRef = useRef(state)
    const setState = (val) => {
        props.stateChange(stateRef.current, val)
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

    const [cursor, setCursor] = useState("pointer")
    const ctrlKeyDown = useRef(false)

    const states = {
        "initial": () => {
            setOpacity(defaults.stack.opacity)
            setZIndex(10 + props.stackPosition)

            setRotation(defaults.stack.rotation)
            setStackPosition(0)

            resize("stack")

            setTimeout(() => {
                setTransition(defaults.stack.transition)
                if (props.stackPosition !== 0) {
                    setStackPosition(props.stackPosition)
                    setY(window.innerHeight - (mobileRef.current ? defaults.stack.mobile_yOffset : defaults.stack.yOffset) - props.stackPosition*(mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing))
                    setState("initial-to-stack")
                }
                else setState("stack")
            }, 300)
        },

        "initial-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)

                if (props.isActive) setTimeout(() => setState("stack"), 300)
                else {
                    resize("stack")
                    setState("stack")
                }
            }
        },

        "stack": () => {
            if (pointer === "move" && !props.locked) {
                setPointer("in")
                setTransition(defaults.preview.transition)
                setX(x - (mobileRef.current ? defaults.preview.mobileDistance : defaults.preview.distance))
                setY(y + (mobileRef.current ? defaults.preview.mobileDistance : defaults.preview.distance))
                // props.preview()
                setOpacity(defaults.preview.opacity)
                setState("stack-to-preview")
            }

            if ((pointer === "down" && !props.locked) || props.isActive) {
                setPointer("in")

                if (!props.isActive) props.clickHandler()
                props.lock()

                setTransition(defaults.board.transition)
                setZIndex(1000)
                setZ(-1000)
                setRotation(null)

                resize("board")
                setState("preview-to-board")
            }

            if (props.stackPosition !== stackPosition && props.stackPosition > -1) {
                setStackPosition(props.stackPosition)
                setY(window.innerHeight - (mobileRef.current ? defaults.stack.mobile_yOffset : defaults.stack.yOffset) - props.stackPosition*(mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing))
                setZIndex(10 + props.stackPosition)
            }

            if (transitionEnded) {
                setTransitionEnded(false)
            }

            // if (props.dim !== dim) {
            //     setDim(props.dim)
            //     setOpacity(props.dim ? dimOpacity : defaults.stack.opacity)
            // }

        },

        "stack-to-preview": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setState("preview")
            }
        },

        "preview": () => {
            if (pointer === "out") {
                setX(x + (mobileRef.current ? defaults.preview.mobileDistance : defaults.preview.distance))
                setY(y - (mobileRef.current ? defaults.preview.mobileDistance : defaults.preview.distance))
                // props.unpreview()
                setOpacity(defaults.stack.opacity)
                setState("preview-to-stack")

            }

            if (props.stackPosition !== stackPosition) {
                setStackPosition(props.stackPosition)
                setZIndex(10 + props.stackPosition)
            }


            if (pointer === "up" && !props.locked) {
                setPointer("in")

                props.clickHandler()
                props.lock()

                setTransition(defaults.board.transition)
                setZIndex(1000)
                setZ(-1000)
                setRotation(null)
                setOpacity(defaults.stack.opacity)

                resize("board")
                setState("preview-to-board")
            }

            if (pointer === "move" && lastPointer.current === "down" && ctrlKeyDown.current) {
                // props.unpreview()
                setState("preview-to-drag")
            }
        },

        "drag": () => {
            if (pointer === "up") {
                setPointer("out")

                props.unlock()

                setTransition(defaults.stack.transition)
                setX(window.innerWidth - (mobileRef.current ? defaults.stack.mobile_xOffset : defaults.stack.xOffset))
                setY(window.innerHeight - (mobileRef.current ? defaults.stack.mobile_yOffset : defaults.stack.yOffset) - stackPositionRef.current*(mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing))

                setState("drag-to-stack")
            }

            if (props.stackPosition !== stackPosition) {
                setStackPosition(props.stackPosition)
                setZIndex(10 + props.stackPosition)
            }

            if (pointer === "move") {
                setPointer("down")

                let originalY = window.innerHeight - (mobileRef.current ? defaults.stack.mobile_yOffset : defaults.stack.yOffset) - stackPositionRef.current*(mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing)

                let dx = x + dragDelta.current.x - props.stackContext.x
                let dy = y - originalY

                setX(x + dragDelta.current.x)
                setY(y + dragDelta.current.y)

                dragDelta.current = {x:0, y:0}

                if (Math.abs(dy) > (mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing)) {
                    props.shift(dy > 1 ? -1 : 1)
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
                setTransition(defaults.stack.transition)
                resize("stack")
                setState("stack")
            }
        },

        "preview-to-board": () => {
            // debugger
            if (transitionEnded) {
                setTransitionEnded(false)
                props.unlock()
                // setZIndex(100)
                setZIndex(1)
                setCursor("default")
                resize("board")
                setState("board")
            }
        },

        "board": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
            }

            if (!props.isActive) {
                setTransition(defaults.board.transition)
                setZIndex(10 + props.stackPosition)
                setZ(0)

                setRotation(defaults.stack.rotation)

                if (props.stackPosition !== stackPosition) {
                    setStackPosition(props.stackPosition)
                    setZIndex(10 + props.stackPosition)
                }
                resize("stack")

                setState("board-to-stack")
            }

        },

        "board-to-stack": () => {
            if (transitionEnded) {
                setTransitionEnded(false)
                setTransition(defaults.stack.transition)
                resize("stack")
                setPointer("out")
                setState("stack")
            }
        }

    }

    function pointerMoveHandler(event) {
        if (stateRef.current === "drag") {
            setPointer("move")
            dragDelta.current = {x: event.movementX, y: event.movementY}
        } else if (["in", "down"].indexOf(pointerRef.current) > - 1) {
            setPointer("move")
        }
    }

    function pointerUpHandler() {
        if (["drag", "preview"].indexOf(stateRef.current) > -1) setPointer("up")
    }

    function resizeHandler() {
        let mobile = window.innerWidth <= 500
        setMobile(mobile)

        if (!stateRef.current.includes("-to-")) resize()
    }

    const resize = (to) => {
        if ((stateRef.current === "board" && to === undefined) || to === "board") {
            setX(Math.round(window.innerWidth*(1 - (mobileRef.current ? defaults.board.mobile_width : defaults.board.width))/2))
            setY(Math.round(window.innerHeight*(1 - (mobileRef.current ? defaults.board.mobile_height : defaults.board.height))/2))
            setWidth( Math.round(window.innerWidth*(mobileRef.current ? defaults.board.mobile_width : defaults.board.width)) + "px")
            setHeight(Math.round(window.innerHeight*(mobileRef.current ? defaults.board.mobile_height : defaults.board.height)) + "px")
        } else {
            setX(window.innerWidth - (mobileRef.current ? defaults.stack.mobile_xOffset : defaults.stack.xOffset))
            setY(window.innerHeight - (mobileRef.current ? defaults.stack.mobile_yOffset : defaults.stack.yOffset) - stackPositionRef.current*(mobileRef.current ? defaults.stack.mobileSpacing : defaults.stack.spacing))
            setWidth(mobileRef.current ? defaults.stack.mobile_width : defaults.stack.width)
            setHeight(mobileRef.current ? defaults.stack.mobile_height : defaults.stack.height)
        }
    }

    function keyDownHandler(event) {
        if (["Meta", "Control"].indexOf(event.key) > -1) {
            ctrlKeyDown.current = true
            setCursor("grabbing")
        }
    }

    function keyUpHandler(event) {
        if (ctrlKeyDown.current) {
            ctrlKeyDown.current = false
            setCursor("pointer")
        }
    }

    useEffect(() => {
        window.addEventListener("pointermove", pointerMoveHandler)
        window.addEventListener("pointerup", pointerUpHandler)
        window.addEventListener("resize", resizeHandler)
        window.addEventListener("keydown", keyDownHandler)
        window.addEventListener("keyup", keyUpHandler)

        return () => {
            window.removeEventListener("pointermove", pointerMoveHandler)
            window.removeEventListener("pointerup", pointerUpHandler)
            window.removeEventListener("resize", resizeHandler)
            window.removeEventListener("keydown", keyDownHandler)
            window.removeEventListener("keyup", keyUpHandler)
        }
    }, [])

    useEffect(() => {
        if (state) {
            console.log(`Card ${id} re-rendered to state: ${state}`)
            states[state]()
        }
    })

    const CardContent = props.content.component

    return (
        <div className="Card"
             style={{
                 transform: `translate(${x}px, ${y}px) ${rotation ? `rotate3d(${rotation})` : ""} ${z ? `translateZ(${z}px)` : ""}`,
                 // TODO: implement scaling instead of width/height for more efficient rendering
                 width: width,
                 height: height,
                 // opacity: opacity,
                 zIndex: zIndex,
                 transition: transition,
                 cursor: cursor,
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

            <div className="body">
                {
                     (state === "board" && props.content.component)
                         ? (<CardContent stackContext={props.stackContext} />)
                         : (
                            <div className="icon-wrapper" style={{
                                background: `linear-gradient(48deg, black, rgba(0, 0, 0, ${opacity}))`
                            }}>
                                <img src={props.content.icon} draggable="false" style={{
                                    height: mobile ? "30px" : "70px",
                                    maxWidth: mobile ? "30px" : null
                                }} />

                            </div>
                            )
                }
            </div>


            {
                (!mobile || state === "board") && (<div className="label" style={{
                    backgroundColor: id === 0 ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.3)",
                    color: id === 0 ? "black" : "white"
                }}>
                    [{id}] {props.content.text}
                </div>)
            }
        </div>
    )
}