import React from "react";
import styles from "../css/background.module.css"

class Bg extends React.Component {
    render() {
        return (
            <div className={styles.main} style={{backgroundImage: 'url("../images/bg.jpg")'}} />
        )
    }

}

export default Bg