import ProjectHeader from "../common/ProjectHeader/ProjectHeader";
import icons from "../common/Icons/iconAssets";
import styles from './dsocWebsite.module.css'

import homepage from './homepage.png'
import events from './events.png'
import singleEvent from './single-event.png'

const title = "dSoc Website"

const githubLink = "https://github.com/soton-dsoc/website"
const demoLink = "https://soton-dsoc.org/"
const demoTitle = "soton-dsoc.org"


export default function dsocWebsite() {


    return (
        <div className={styles.dsocWebsite}>
            <div className="card-sectionA">
                <ProjectHeader
                    title={title}
                    siteTitle={demoTitle} siteHref={demoLink}
                    sourceLink={githubLink}
                    icons={[
                        icons.web.js,
                        icons.web.vue,
                        icons.programming.php,
                        icons.programming.laravel,
                    ]}
                />

                <div className="content-card" style={{flexDirection: "column"}}>

                    <span>Came up with the design, integrated everyone's opinions</span>
                    <span>Design process can be seen at //Figma</span>
                    <span>
                        As the web officer of the Decentralised Society, I listened to and incorporated various design ideas, capturing them on Figma to create a fresh, responsive design using React. Members use it to register for events.
                    </span>

                    <span>Backend in strapi</span>
                    <span>Also used a UI framework [name]</span>
                </div>

                <div className="image-card">
                    <img src={homepage} />
                </div>
            </div>

            <div className="card-sectionB">
                <div className="image-card">
                    <img src={events} />
                </div>

                <div className="image-card">
                    <img src={singleEvent} />
                </div>
            </div>
        </div>
    )
}