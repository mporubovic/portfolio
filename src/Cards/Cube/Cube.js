import styles from './Cube.module.css'
import icons from "../common/Icons/iconAssets";

import canvas from './canvas.png'
import controls from './controls.png'
import ProjectHeader from "../common/ProjectHeader/ProjectHeader";

const githubLink = "https://github.com/mporubovic/cube"
const demoLink = "http://cube.porubovic.sk/"


export default function Cube() {
    return (
        <div className={styles.Cube}>
            <div className={styles.sectionA}>

                <ProjectHeader title="Cube"
                    siteTitle={"cube.porubovic.sk"} siteHref={demoLink}
                    sourceLink={githubLink}
                    icons={[
                        icons.web.js,
                        icons.web.node,
                        icons.digitalocean
                    ]}
                />

                <div className="text-card">
                    <span>The Cube is a project I made to explore the possibilities of the modern web using Three.js, where a user scans a QR code using their phone, allowing them to control a 3D cube on another screen.</span>
                    <span>I learnt websockets and node.js that run on the backend. The controller UI is written in vanilla JS. Deployed on DigitalOcean. The server acts as a relay between the controller and the game board, and uses channels to isolate game instances.</span>
                    <span>You can try it out by scanning the QR code on your phone in the Live Demo. <i>Note: Sound doesn't work on Safari.</i></span>
                    <span>
                        <i><u>Instructions:</u></i> <br />
                        Tap and move joystick to roll the cube.<br />
                        Press buttons to zoom, rotate, change colour.<br />
                        Scroll/pinch to zoom and right click+drag to move the camera.
                    </span>
                </div>

                <div className={styles.showcase}>
                    <div className="image-card" style={{flex: 1}}>
                        <img src={canvas} />
                    </div>

                    <div className="image-card" style={{flex: 1}}>
                        <img src={controls} />
                    </div>
                </div>
            </div>

            <div className={styles.sectionB}>

                <div className="content-card" style={{flexDirection: "column", flex: 1}}>
                    <h2>Live demo</h2>
                    <br />
                    <iframe src={demoLink} />
                </div>

            </div>
        </div>
    )
}