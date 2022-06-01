import styles from "../../Cube/Cube.module.css";
import Icons from "../Icons/Icons";
import icons from "../Icons/iconAssets";
import ActionButton from "../ActionButton/ActionButton";


export default function ProjectHeader(props) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px"
        }}>
            <div className="content-card">
                <h2>{props.title}</h2>
            </div>

            <div className={styles.projectInfo}>

                <Icons icons={props.icons}  height="20px" style={{
                    gridArea: "1 / 1 / 2 / 3",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    flex: 2,
                }}


                />

                <div style={{
                    display: "flex",
                    gap: "10px",
                    flex: 3,
                }}>
                    <ActionButton text="Source" icon={icons.github} href={props.sourceLink} style={{flex: 1}} />

                    <ActionButton text={props.siteTitle} href={props.siteHref} style={{flex: 1}} />
                </div>

            </div>
        </div>
    )
}
