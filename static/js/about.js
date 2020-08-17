import React from "react";
import styles from "../css/about.module.css"
import "../css/bootstrap/css/bootstrap.css"
import Resume from "./resume";
import { Link, Element } from "react-scroll";


class About extends React.Component{
    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {
        return (
            <div>
                <div className={styles.main}>
                    <div className={styles.row}>
                        <div className={styles.imageOuterContainer}>
                            <div className={styles.imageContainer} style={{backgroundImage: "url('../images/about/me.jpg')"}}>

                            </div>
                            <div className={styles.roleContainer}>
                                <h4>
                                    Software Developer
                                </h4>
                                <h4>
                                    Web Developer
                                </h4>
                                <h4>
                                    Physicist
                                </h4>
                            </div>
                        </div>
                        <div className={styles.rightContent}>
                            <h4>
                                Software developer from University of Toronto with strong background in physics and
                                mathematics, passionate about learning new things and developing world-class applications.
                            </h4>
                            <h4>
                                Familiar with Object Oriented Programming, data structure and algorithm, and source control
                                using Git.
                            </h4>
                            <h4>
                                Achieved Master's degree in computer engineering in June 2020 and currently seeking for a
                                full-time position.
                            </h4>
                            <h4 style={{fontWeight: "bold"}}>
                                For more details check out my full resume.
                            </h4>
                            <div className={styles.resumeButtonRow}>
                                <Link activeClass="active"
                                      to="resume"
                                      spy={true}
                                      smooth={true}
                                      duration={500}
                                >
                                    <button type="button" className={`btn btn-dark ${styles.button}`}>View Online</button>
                                </Link>
                                <a href="/resume">
                                    <button type="button" className={`btn btn-dark ${styles.button}`}>Download</button>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>

                <Element name="resume"><Resume /></Element>

            </div>

        )
    }
}


export default About