import styles from './Icons.module.css'

export default function Icons(props) {
    const mobile = window.innerWidth <= 500

    return (
        <div className="content-card" style={props.style}>
            {
                props.icons.map((icon, i) => (
                    <img key={i} src={icon} style={{
                        height: mobile ? (icon.includes("java") ? "40px" : "20px") : (icon.includes("java") ? "50px" : props.height)// horrible I know
                    }}  />
                ))
            }
        </div>
    )

}
