import styles from './AboutMe.module.css'
import pfp from './pfp.png'
import ActionButton from "../common/ActionButton/ActionButton";
import Icons from "../common/Icons/Icons";
import icons from "../common/Icons/iconAssets";

const name = "Matej Porubovic"

const phone = "+44 7539 466503"
const phoneHref = "tel:+447539466503"

const email = "matej@porubovic.sk"
const emailHref = "mailto:matej@porubovic.sk"

const linkedin = "https://www.linkedin.com/in/matej-porubovic/"
const github = "https://github.com/mporubovic"
const discord = "https://discord.com/users/213766571942871041"

const jsZoomPanHref = "https://github.com/mporubovic/zoomable.js"
const linksHref= "http://links.porubovic.sk/"

const cv = "https://google.com"

const text = [
    "Welcome to my portfolio! Click on any project below/on the right to learn more.",
    "I’ve done 2 years of Engineering and a year of Computer Science",
    "I really enjoy web programming, currently perfecting my React skills and learning TypeScript, passion for UI/UX, use Figma a lot.",
    "In my spare time, if I’m not programming or designing, I learn Chinese (普通话) and read books; my favourites are Sapiens and I, Robot.",
    "My programming knowledge is listed below and have a look at some of my projects.",
    "Pro tip: Command/Ctrl + drag to re-arrange cards in the stack"
]

export default function AboutMe(props) {

    return (
        <div className={styles.AboutMe}>
            <div className={styles.sectionABackground}>

                <div className={styles.sectionA}>
                    <div className="content-card">
                        <img src={pfp} style={{
                            height: "60px"
                        }} />
                        <h1 style={{
                            marginLeft: "20px"
                        }}>
                            {name}
                        </h1>
                    </div>

                    <div className="content-card" style={{
                        flexDirection: "column",
                        gap: "20px",
                        textAlign: "justify",
                        alignItems: "flex-start",
                    }}>
                        { text.map((t, i) => (
                            <span key={i}>{t}</span>
                        )) }
                    </div>

                    <div style={{
                        display: "flex",
                        gap: "15px",
                        flexDirection: "column"
                    }}>
                        <Icons icons={[
                            icons.web.html5,
                            icons.web.css3,
                            icons.web.js,
                            icons.web.react,
                            icons.web.vue,
                            icons.web.three,
                            icons.web.node
                        ]} height="30px" />

                        <Icons icons={[
                            icons.programming.php,
                            icons.programming.mysql,
                            icons.programming.laravel,
                            icons.programming.java,
                            icons.programming.python
                        ]} height="25px" />

                        <Icons icons={[
                            icons.figma,
                            icons.tools.photoshop,
                            icons.tools.fusion360,
                            icons.tools.googleanalytics,
                        ]} height="25px" />
                    </div>

                </div>

            </div>

            <div className={styles.sectionBBackground}>
                <div className={styles.sectionB}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto auto",
                        gridTemplateRows: "auto auto",
                        gap: "10px"
                    }}>

                        <ActionButton target={false} icon={icons.phone} text={phone} href={phoneHref}
                                      style={{ flex: "auto", gridArea: "1 / 1 / 2 / 2" }}
                        />

                        <ActionButton icon={icons.linkedin} href={linkedin}
                                      style={{ gridArea: "1 / 2 / 2 / 3" }}
                        />

                        <ActionButton icon={icons.discord} href={discord}
                                      style={{ gridArea: "1 / 3 / 2 / 4" }}
                        />

                        <ActionButton target={false} icon={icons.email} text={email} href={emailHref}
                                      style={{ flex: "auto", gridArea: "2 / 1 / 3 / 2" }}
                        />

                        <ActionButton text="CV" href={cv}
                                      style={{ gridArea: "2 / 2 / 3 / 3" }}
                        />

                        <ActionButton icon={icons.github} href={github}
                                      style={{ gridArea: " 2 / 3 / 2 / 4" }}
                        />

                    </div>

                    <div>
                        <div className={styles.projectsTitle}>
                            <hr style={{flex: 1}} />
                            <span>PROJECTS</span>
                            <hr style={{flex: 1}} />
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplate: "1fr 1fr / 1fr 1fr",
                            gap: "15px"
                        }}>



                            <ActionButton icon={icons.cards.cube}
                                          iconSize="50px"
                                          text="Cube"
                                          flexDirection="column"
                                          callback={() => props.stackContext.drawCard(1)}
                            />

                            <ActionButton icon={icons.cards.mylayr}
                                          iconSize="50px"
                                          text="Tutoring App"
                                          flexDirection="column"
                                          callback={() => props.stackContext.drawCard(4)}
                            />

                            <ActionButton icon={icons.cards.dsoc}
                                          iconSize="50px"
                                          text="dSoc website"
                                          flexDirection="column"
                                          callback={() => props.stackContext.drawCard(2)}
                            />

                            <ActionButton icon={icons.figma_white}
                                          iconSize="50px"
                                          text="dSoc designs"
                                          flexDirection="column"
                                          callback={() => props.stackContext.drawCard(3)}
                            />


                        </div>
                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplate: "1fr 1fr / 1fr 1fr",
                        gap: "15px"
                    }}>

                        <ActionButton icon={icons.touchpad}
                                      text="JS zoom/pan"
                                      href={jsZoomPanHref}
                        />

                        <ActionButton icon={icons.camera}
                                      text="Photography"
                                      callback={() => props.stackContext.drawCard(5)}
                        />

                        <ActionButton icon={icons.link}
                                      text="Links"
                                      href={linksHref}
                        />

                        <ActionButton icon={icons.document}
                                      text="WIP"
                                      callback={() => null}
                        />
                    </div>
                </div>



            </div>
        </div>
    )
}