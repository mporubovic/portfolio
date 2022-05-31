import styles from './Icons.module.css'

export default function Icons(props) {

    return (
        <div className="content-card" style={props.style}>
            {
                props.icons.map((icon, i) => (
                    <img key={i} src={icon} style={{
                        height: props.height
                    }}  />
                ))
            }
        </div>
    )

}
