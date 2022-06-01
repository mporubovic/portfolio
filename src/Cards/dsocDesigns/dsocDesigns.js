import styles from './dsocDesigns.module.css'

const images = [
    require("./blockchain101.jpg"),
    require("./ipfs.jpg"),
    require("./crypto.png"),
    require("./pubquiz.jpg"),
    require("./ethereum.jpg")
]

console.log(images)
export default function dsocDesigns() {
    return (
        <div className={styles.dsocDesigns}>
            {
                images.map((image, i) => (
                    // has to be wrapped in a div because of Safari stretching images in flex boxes
                    <div className={styles.imageWrapper}>
                        <img src={image} key={i} />
                    </div>
                ))
            }
        </div>
    )
}