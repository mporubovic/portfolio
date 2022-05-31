import styles from './Cube.module.css'
import Icons from "../common/Icons/Icons";
import icons from "../common/Icons/iconAssets";
import ActionButton from "../common/ActionButton/ActionButton";

import canvas from './canvas.png'
import controls from './controls.png'
import {useEffect, useRef} from "react";

const githubLink = "https://github.com/mporubovic/cube"
const demoLink = "http://cube.porubovic.sk/"


export default function Cube() {
    return (
        <div className={styles.Cube}>
            <div className={styles.sectionA}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                }}>
                    <div className="content-card">
                        <h2>Cube</h2>
                    </div>

                    <div className={styles.projectInfo}>

                        <Icons icons={[
                            icons.web.js,
                            icons.web.node,
                            icons.digitalocean
                        ]}  height="20px" style={{
                            gridArea: "1 / 1 / 2 / 3",
                            paddingTop: "15px",
                            paddingBottom: "15px",
                            flex: 3,
                        }}


                        />

                        <div style={{
                            display: "flex",
                            gap: "10px"
                        }}>
                            <ActionButton text="Source" icon={icons.github} href={githubLink} style={{flex: 1}} />

                            <ActionButton text="cube.porubovic.sk" href={demoLink} style={{flex: 1}} />
                        </div>

                    </div>
                </div>

                <div className="content-card" style={{
                    flexDirection: "column",
                    gap: "20px",
                    textAlign: "justify",
                    alignItems: "flex-start",
                }}>
                    <span>The Cube is a project I made to explore the possibilities of the modern web using Three.js, where a user scans a QR code using their phone, allowing them to control a 3D cube on another screen.</span>
                    <span>I learnt websockets and node.js that run on the backend. The controller UI is written in vanilla JS. Deployed on DigitalOcean. The server acts as a relay between the controller and the game board, and uses channels to isolate game instances.</span>
                    <span>You can try it out by scanning the QR code on your phone in the Live Demo. <i>Note: Sound doesn't work on Safari</i></span>
                    <span>
                        <i><u>Instructions:</u></i> <br />
                        Tap and move joystick to roll the cube.<br />
                        Press buttons to zoom, rotate, change colour.<br />
                        Scroll/pinch to zoom and right click+drag to move the camera.
                    </span>
                </div>

                <div className={styles.showcase}>
                    <div className="content-card" style={{flex: 1}}>
                        <img src={canvas} />
                    </div>

                    <div className="content-card" style={{flex: 1}}>
                        <img src={controls} />
                    </div>
                </div>
            </div>

            <div className={styles.sectionB}>

                <div className="content-card" style={{flexDirection: "column", flex: 1}}>
                    <h2>Live demo</h2>
                    <br />
                    {/*<span>span</span>*/}
                    <iframe src={demoLink} />
                </div>

            </div>
        </div>
    )
}