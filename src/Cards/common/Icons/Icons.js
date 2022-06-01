import styles from './Icons.module.css'

export default function Icons(props) {

    return (
        <div className="content-card" style={props.style}>
            {
                props.icons.map((icon, i) => (
                    <img className={styles.icon} key={i} src={icon} style={{
                        height: props.height
                    }}  />
                ))
            }
        </div>
    )

}
