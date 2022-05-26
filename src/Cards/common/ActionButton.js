import styles from './ActionButton.module.css'

export default function ActionButton(props) {

    return (
        <a className={styles.ActionButton} style={{...props.style}} href={props.href} target={props.target ?? "_blank"}>
            {
                props.icon && (
                    <img src={props.icon}/>
                )
            }

            {
                props.text && (
                    <a>{props.text}</a>
                )
            }

        </a>
    )
}