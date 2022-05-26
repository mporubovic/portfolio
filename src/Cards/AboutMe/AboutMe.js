import styles from './AboutMe.module.css'
import pfp from './pfp.png'
import ActionButton from "../common/ActionButton";

const name = "Matej Porubovic"

const phone = "07539 466503"
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

}

export default function AboutMe() {

    return (
        <div className={styles.AboutMe}>
            <div className={styles.sectionA}>
                <div className={styles.card} style={{

                }}>
                    <img src={pfp} style={{
                        height: "60px"
                    }} />
                    <h1 style={{
                        marginLeft: "20px"
                    }}>
                        {name}
                    </h1>
                </div>

                <div className={styles.card} style={{
                    flexDirection: "column",
                    gap: "20px",
                    textAlign: "justify",
                    alignItems: "flex-start"
                }}>
                    { text.map((t, i) => (
                        <span key={i}>{t}</span>
                    )) }
                </div>

                <div className={styles.card}>
                    {
                        icons.web.map((w, i) => (
                            <img key={i} src={w} style={{
                                height: "30px"
                            }}  />
                        ))
                    }
                </div>

                <div className={styles.card}>
                    {
                        icons.programming.map((p, i) => (
                            <img key={i} src={p} style={{
                                height: "20px"
                            }}  />
                        ))
                    }
                </div>

                <div className={styles.card}>
                    {
                        icons.tools.map((t, i) => (
                            <img key={i} src={t} style={{
                                height: "20px"
                            }}  />
                        ))
                    }
                </div>
            </div>

            <div className={styles.sectionB}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px"
                }}>
                    <ActionButton
                        style={{ flex: "auto" }}
                        target={false}
                        icon={icons.phone}
                        text={phone}
                        href={phoneHref}
                    />

                    <ActionButton
                        icon={icons.linkedin}
                        href={linkedin}
                    />

                    <ActionButton
                        icon={icons.discord}
                        href={discord}
                    />

                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px"

                }}>
                    <ActionButton
                        style={{ flex: "auto" }}
                        target={false}
                        icon={icons.email}
                        text={email}
                        href={emailHref}
                    />

                    <ActionButton
                        text="CV"
                        href={cv}
                    />

                    <ActionButton
                        icon={icons.github}
                        href={github}
                    />
                </div>
            </div>
        </div>
    )
}