import ProjectHeader from "../common/ProjectHeader/ProjectHeader";
import icons from "../common/Icons/iconAssets";
import styles from './tutoringApp.module.css'

import homepage from './homepage.png'
import board from './board.png'
import boards from './boards.png'
import drawing from './drawing.png'

const title = "Tutoring app"

const githubLink = "https://github.com/mporubovic/layr-fe"
const demoLink = "http://mylayr.porubovic.sk"
const demoTitle = "mylayr.porubovic.sk"


export default function tutoringApp() {


    return (
        <div className={styles.tutoringApp}>
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

                <div className="text-card">

                    <span>I created a single-page online tutoring app for my tutor to help her organise teaching materials like PDFs, images, YouTube videos, drawings and links.</span>
                    <span>The front-end was built using Vue.js, with dynamic components and CSS grids, integration with TinyMCE editor and fabric.js drawing library.</span>
                    <span>I used Laravel for the backend to create REST API endpoints, storing data in a MySQL database. I also used Lumen for a webscraping micro-service.</span>
                </div>

                <div className="image-card">
                    <img src={homepage} />
                </div>
            </div>

            <div className="card-sectionB">
                <div className="image-card">
                    <img src={board} />
                </div>

                <div className="image-card">
                    <img src={boards} />
                </div>

                <div className="image-card">
                    <img src={drawing} />
                </div>
            </div>
        </div>
    )
}