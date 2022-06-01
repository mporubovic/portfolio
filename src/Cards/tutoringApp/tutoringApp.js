import ProjectHeader from "../common/ProjectHeader/ProjectHeader";
import icons from "../common/Icons/iconAssets";
import styles from './tutoringApp.module.css'

import homepage from './homepage.png'
import board from './board.png'
import boards from './boards.png'
import cards from './cards.png'
import drawing from './drawing.png'

const title = "Tutoring app"

const githubLink = "https://github.com/mporubovic/layr-fe"
const demoLink = "http://mylayr.porubovic.sk"
const demoTitle = "mylayr.porubovic.sk"


export default function tutoringApp() {


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

                    <span>I created a single-page online tutoring app for my tutor to help her organise teaching materials and easily share them with her students, saving her 1 hour each day.</span>
                    <span>I used Vue.js for the front-end, with dynamic components and CSS grids, consuming a REST API written in Laravel, using a MySQL database with polymorphic relations and a Lumen webscraping microservice.</span>
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

                {/*<div className="image-card">*/}
                {/*    <img src={cards} style={{maxHeight: "50%"}} />*/}
                {/*</div>*/}
            </div>
        </div>
    )
}