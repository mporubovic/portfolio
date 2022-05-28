import styles from './ActionButton.module.css'

export default function ActionButton(props) {

    return (
        <a className={styles.ActionButton} href={props.href ?? undefined} target={props.target === false ? undefined : "_blank"}
           style={{...props.style, flexDirection: props.flexDirection ?? "row" }}
           onPointerUp={() => props.callback && props.callback()}
        >
            {
                props.icon && (
                    <img src={props.icon} style={{ height: props.iconSize ?? "20px" }}/>
                )
            }

            {
                props.text && (props.text)
            }

        </a>
    )
}