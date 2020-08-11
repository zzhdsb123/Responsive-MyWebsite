import React from "react";
import styles from "../css/home.module.css"

class Home extends React.Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.innerContainer}>
                    <div className={styles.row}>
                        <div>
                            <h1 className={styles.textContainer}>
                                Hello,
                                <div style={{animationDelay: "1s"}} className={styles.solidBar}/>
                            </h1>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div>
                            <h1 style={{animationDelay: "2s"}} className={styles.textContainer}>
                                My name is Jack,
                                <div style={{animationDelay: "3s"}} className={styles.solidBar}/>
                            </h1>
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div>
                            <h1 style={{animationDelay: "4s"}} className={styles.textContainer}>
                                Welcome to my website.
                                <div style={{animationDelay: "5s"}} className={styles.solidBar}/>
                            </h1>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Home