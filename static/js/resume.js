import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import prevStyles from "../css/about.module.css"
import styles from "../css/resume.module.css"

function Tech(props) {
    return (
        <div className={styles.flipOuterContainer}>
            <div className={styles.rotateContainer}>
                <div className={styles.frontImage}>
                    <img src={`${props.url}`} />
                </div>
                <div className={styles.backImage}>
                    {props.name}
                </div>
            </div>
        </div>
    )
}

function TechNotPhone() {
    return (
        <div className={styles.techNotPhone}>
            <div className={styles.techRow}>
                <Tech url={"../images/about/python-icon.png"} name={"Python"} />
                <Tech url={"../images/about/flask-icon.png"} name={"Flask"} />
                <Tech url={"../images/about/256px-Node.js_logo.svg.png"} name={"NodeJS"} />
                <Tech url={"../images/about/HTML5_Logo_128.png"} name={"HTML5"} />
                <Tech url={"../images/about/iconfinder_css3_294692.png"} name={"CSS3"} />
                <Tech url={"../images/about/1024px-React.svg.png"} name={"ReactJS"} />
                <Tech url={"../images/about/icons8-c-sharp-logo-96.png"} name={"C#"} />
                <Tech url={"../images/about/icons8-unity-100.png"} name={"Unity"} />
                <Tech url={"../images/about/mysql-icon.png"} name={"MySQL"} />
                <Tech url={"../images/about/swift-icon.png"} name={"Swift"} />
            </div>
        </div>
    )
}

function ResumeAnimation(props) {
    const [show, set] = useState(false)
    const Listener = () => {
        let rect = document.getElementById(props.id).getBoundingClientRect()
        if (rect.top <= 600) {
            set(true)
            window.removeEventListener("scroll", Listener)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", Listener)
        return () => window.removeEventListener("scroll", Listener)
    }, [])

    const animateProps = useSpring({
        opacity: show ? 1 : 0,
        transform: show ? "translateX(0%)": "translateX(-50%)"
    })
    return (
        <animated.div style={animateProps}>
            {props.content}
        </animated.div>
    )
}

class Resume extends React.Component {
    basicInfo() {
        return (
            <div className={styles.section} id={"basic-info"}>
                <div className={`${styles.row} ${styles.rowToCol}`}>
                    <h3 className={styles.name}>
                        Zihan (Jack) Zhang
                    </h3>
                    <div className={`${styles.row}`}>
                        <div className={styles.titleRight}>
                            <h4>Phone</h4>
                            <h4>Email</h4>
                            <h4>Address</h4>
                            <h4>Website</h4>
                            <h4>Github</h4>
                        </div>
                        <div className={styles.titleRight + ' ' + styles.titleRightRight}>
                            <h4>416-388-4930</h4>
                            <h4>zhangye.zhang@mail.utoronto.ca</h4>
                            <h4>169p Finch Ave E, Toronto, ON, M2N 4R8</h4>
                            <h4>ec2-18-191-198-30.us-east-2.compute.amazonaws.com</h4>
                            <h4>github.com/zzhdsb123</h4>
                        </div>
                    </div>
                </div>
                <p className={styles.description}>New Master of Engineering Grad from University of Toronto</p>
            </div>
        )
    }

    techUsed() {
        return (
            <div className={styles.section} id={"tech-used"}>
                <h3 className={styles.techDescription}>Here are some technologies that I use.</h3>
                <TechNotPhone />

            </div>
        )
    }

    education() {
        return (
            <div className={styles.section} id={"education"}>
                <h2 className={styles.educationTitle}>
                    Education
                </h2>
                <div className={`${styles.row} ${styles.rowToCol}`}>
                    <div className={styles.col}>
                        <h3>Master of Engineering</h3>
                        <h5>University of Toronto</h5>
                    </div>
                    <div className={styles.separator}/>
                    <h4 className={styles.time}>September 2018 - June 2020</h4>
                </div>
                <div className={styles.resumeDetail}>
                    <h5>Majored in Computer Engineering.</h5>
                    <h5>Learned data structure and algorithm, cloud computing and mobile app development.</h5>
                    <h5>Learned data science and machine learning (Python and Scikit-learn, a free software machine learning library for the Python programming language).</h5>
                    <h5>Average GPA 3.6.</h5>
                </div>

                <div className={styles.rowCenter}>
                    <div className={styles.splitLine} />
                </div>

                <div className={`${styles.row} ${styles.rowToCol}`}>
                    <div className={styles.col}>
                        <h3>Honours Bachelor of Science</h3>
                        <h5>University of Toronto</h5>
                    </div>
                    <div className={styles.separator}/>
                    <h4 className={styles.time}>September 2014 - June 2018</h4>
                </div>
                <div className={styles.resumeDetail}>
                    <h5>Dean’s List Scholar (2017-2018).</h5>
                    <h5>Graduate with high distinction (Average GPA higher than 3.5).</h5>
                    <h5>Specialized in Physics (a specialist requires more credits than a major).</h5>
                    <h5>Minored in Mathematics.</h5>
                </div>

            </div>
        )
    }

    employment() {
        return (
            <div className={styles.section} id={"employment"}>
                <h2 className={styles.educationTitle}>
                    Employment
                </h2>
                <div className={`${styles.row} ${styles.rowToCol}`}>
                    <div className={styles.col}>
                        <h3>Help Desk Intern</h3>
                        <h5>Suzhou TF-AMD Semiconductor Co., Ltd.</h5>
                    </div>
                    <div className={styles.separator}/>
                    <h4 className={styles.time}>August 2019 - September 2019</h4>
                </div>
                <div className={styles.resumeDetail}>
                    <h5>Helped installing operating systems on new computers, fixing hardware and software issues for other employees.</h5>
                    <h5>Reduced workload at the help-desk.</h5>
                </div>

                <div className={styles.rowCenter}>
                    <div className={styles.splitLine} />
                </div>

                <div className={`${styles.row} ${styles.rowToCol}`}>
                    <div className={styles.col}>
                        <h3>Patent Analyst Intern</h3>
                        <h5>Suzhou Huigu Intellectual Property Service Co., Ltd
                        </h5>
                    </div>
                    <div className={styles.separator}/>
                    <h4 className={styles.time}>August 2018 - September 2018</h4>
                </div>
                <div className={styles.resumeDetail}>
                    <h5>Helped Examining intellectual properties using the Global Design Database managed by the World Intellectual Property Organization (WIPO).</h5>
                    <h5>Helped customer understand the situation of their inventions in application.</h5>
                </div>

            </div>

        )

    }

    render() {
        return (
            <div className={prevStyles.main}>
                <ResumeAnimation content={this.basicInfo()} id={"basic-info"} />
                <ResumeAnimation content={this.techUsed()} id={"tech-used"} />
                <ResumeAnimation content={this.education()} id={"education"}/>
                <ResumeAnimation content={this.employment()} id={"employment"} />
            </div>
        )
    }
}

export default Resume