import styles from './AboutMe.module.css'
import pfp from './pfp.png'
import ActionButton from "../common/ActionButton/ActionButton";
import Icons from "../common/Icons/Icons";

const name = "Matej Porubovic"

const phone = "+44 7539 466503"
const phoneHref = "tel:+447539466503"

const email = "matej@porubovic.sk"
const emailHref = "mailto:matej@porubovic.sk"

const linkedin = "https://www.linkedin.com/in/matej-porubovic/"
const github = "https://github.com/mporubovic"
const discord = "https://discord.com/users/213766571942871041"

const cv = "https://google.com"

const text = [
    "Welcome to my portfolio! Click on any project below/on the right to learn more.",
    "I’ve done 2 years of Engineering and a year of Computer Science",
    "I really enjoy web programming, currently perfecting my React skills and learning TypeScript, passion for UI/UX, use Figma a lot.",
    "In my spare time, if I’m not programming or designing, I learn Chinese (普通话) and read books; my favourites are Sapiens and I, Robot.",
    "My programming knowledge is listed below and have a look at some of my projects.",
]

const icons = {
    web: [
        require('./icons/web/html5.svg').default,
        require('./icons/web/css3.svg').default,
        require('./icons/web/js.svg').default,
        require('./icons/web/react.svg').default,
        require('./icons/web/vue.svg').default,
        require('./icons/web/threejs.svg').default,
        require('./icons/web/nodejs.svg').default
    ],

    programming: [
        require('./icons/programming/php.svg').default,
        require('./icons/programming/mysql.svg').default,
        require('./icons/programming/laravel.svg').default,
        require('./icons/programming/java.svg').default,
        require('./icons/programming/python.svg').default,
    ],

    tools: [
        require('./icons/tools/figma.svg').default,
        require('./icons/tools/photoshop.svg').default,
        require('./icons/tools/fusion360.png'), // png has no default
        require('./icons/tools/facebookads.svg').default,
        require('./icons/tools/googleanalytics.svg').default
    ],

    phone: require('./icons/phone.svg').default,
    email: require('./icons/email.svg').default,

    discord: require('./icons/discord.svg').default,
    linkedin: require('./icons/linkedin.svg').default,
    github: require('./icons/github.svg').default,

    cards: {
        cube: require('./icons/cards/cube.svg').default,
        dsoc: require('./icons/cards/dsoc.svg').default,
        mylayr: require('./icons/cards/mylayr.svg').default,
        stack: require('./icons/cards/stack.svg').default,
    },

    figma: require("./icons/figma.svg").default,
    camera: require("./icons/camera.svg").default,
    document: require("./icons/document.svg").default,
    link: require("./icons/link.svg").default,
    printer: require("./icons/printer.svg").default,
    touchpad: require("./icons/touchpad.svg").default,


}

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
                        <Icons icons={icons.web} height="30px" />

                        <Icons icons={icons.programming} height="20px" />

                        <Icons icons={icons.tools} height="20px" />
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

                    <div style={{
                        display: "grid",
                        gridTemplate: "1fr 1fr / 1fr 1fr",
                        gap: "15px"
                    }}>



                        <ActionButton icon={icons.cards.cube}
                                      iconSize="50px"
                                      text="Cube"
                                      flexDirection="column"
                                      callback={() => props.stackContext.drawCard(2)}
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
                                      callback={() => props.stackContext.drawCard(3)}
                        />

                        <ActionButton icon={icons.figma}
                                      iconSize="50px"
                                      text="dSoc designs"
                                      flexDirection="column"
                                      callback={() => props.stackContext.drawCard(1)}
                        />


                    </div>

                    <div style={{
                        display: "grid",
                        gridTemplate: "1fr 1fr / 1fr 1fr",
                        gap: "15px"
                    }}>

                        <ActionButton icon={icons.touchpad}
                                      text="JS zoom/pan"
                                      callback={() => props.stackContext.drawCard(4)}
                        />

                        <ActionButton icon={icons.camera}
                                      text="Photography"
                                      callback={() => props.stackContext.drawCard(4)}
                        />

                        <ActionButton icon={icons.printer}
                                      text="3D printing"
                                      callback={() => props.stackContext.drawCard(4)}
                        />

                        <ActionButton icon={icons.link}
                                      text="Links"
                                      callback={() => props.stackContext.drawCard(4)}
                        />

                        <ActionButton icon={icons.document}
                                      text="WIP"
                                      callback={() => props.stackContext.drawCard(4)}
                        />
                    </div>
                </div>



            </div>
        </div>
    )
}