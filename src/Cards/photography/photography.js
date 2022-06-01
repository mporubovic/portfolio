import styles from './photography.module.css';

import bezrucova from './bezrucova.jpg'


const images = [
    require('./teplaren.jpg'),
    require('./bezrucovadvor.jpg'),
    require('./matadorka.jpg'),
    require('./becrucovapoistky.jpg'),
    require('./teplarenhat.jpg'),
    require('./cvernovka.jpg'),
    require('./vystava.jpg'),
    require('./bezrucovabw.png')
]

const title = "Photography"

const facebookLink = "https://www.facebook.com/MTUrbex/"


export default function photography() {


    return (
        <div className={styles.photography}>
            <div className="card-sectionA">

                <div className="content-card">
                    <h2>{title}</h2>
                </div>

                <div className="text-card">
                    <span>I used to do Urbex <i>(urban exploration)</i> photography when I was younger. It involved visiting abandoned buildings in Bratislava.</span>
                    <span>I had a Canon 750D camera. Photos were edited using ON1 Photo RAW.</span>
                    <span>You can see photo galleries on my <a href={facebookLink} target="_blank">Facebook page</a>, that I used with my friend Tomas.</span>
                </div>

                <div className="image-card">
                    <img src={bezrucova} />
                </div>
            </div>

            <div className={styles.sectionB}>

                {
                    images.map((image, i) => (
                        <img key={i} src={image} />
                    ))
                }
            </div>
        </div>
    )
}