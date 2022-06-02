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
                        icons.web.react
                    ]}
                />

                <div className="text-card">
                    <span>As the web officer of the Decentralised Society, I came up with the design for the society website and incorporated other people's ideas in Figma.</span>
                    <span>I used React to create this fresh, responsive design, along with <a href="https://mantine.dev" target="_blank">Mantine UI</a> for event sign-up forms.</span>
                    <span>The backend uses <a href="https://strapi.io" target="_blank">Strapi.io</a> to handle event registrations and static content editing.</span>
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