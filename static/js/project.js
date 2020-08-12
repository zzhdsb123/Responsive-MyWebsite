import React, {useEffect, useState} from "react";
import styles from "../css/project.module.css"
import { useTransition, animated, useSpring } from 'react-spring'

const imageCount = 6
function NotateImages() {
    const [imageIndex, set] = useState(0)
    const [direction, setDirection] = useState(true)
    const transitions = useTransition(imageIndex, p => p, {
        from: {opacity: 0, transform: `translate3d(${direction ? '50%' : '-50%'},0,0)`},
        enter: {opacity: 1, transform: 'translate3d(0%,0,0)'},
        leave: {opacity: 0, transform: `translate3d(${direction ? '-50%' : '50%'},0,0)`}
    })
    return (
        <div className={styles.notateImageContainer}>
            <svg width="3em"
                 height="3em"
                 viewBox="0 0 16 16"
                 className={"bi bi-arrow-right-circle " + styles.rightArrow}
                 fill="currentColor"
                 xmlns="http://www.w3.org/2000/svg"
                 id={"right-arrow"}
                 onClick={() => {
                     setDirection(true)
                     set((imageIndex + 1) % imageCount)
                 }}
            >
                <path fillRule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-8.354 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z"/>
            </svg>

            <svg
                width="3em"
                height="3em"
                viewBox="0 0 16 16"
                className={"bi bi-arrow-left-circle-fill " + styles.leftArrow}
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                id={"left-arrow"}
                onClick={() => {
                    setDirection(false)
                    set((imageIndex - 1 + imageCount) % imageCount)
                }}
            >
                <path fillRule="evenodd"
                      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.646 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L6.207 7.5H11a.5.5 0 0 1 0 1H6.207l2.147 2.146z"/>
            </svg>

            {transitions.map(({item, props, key}) => (
                <animated.div
                    className={styles.notateImage}
                    key={key}
                    style={{...props, backgroundImage: `url("../../images/projects/notate/${item}.png")`}}
                >
                    {/*{console.log("item", item, "props", props, "key", key)}*/}
                </animated.div>
            ))}
        </div>
    )
}

const hash = {
    0: "https://www.youtube.com/embed/Yf1xGTWtJ6w",
    1: "https://www.youtube.com/embed/-6KYYP3Xowg"
}
function MagicTowerVideos(props) {
    const[video, set] = useState(props.id)
    useEffect(() => {
        set(props.id)
    }, [props.id])

    const transitions = useTransition(video, null, {
        from: {opacity: 0, transform: "scale(0.9)"},
        enter: {opacity: 1, transform: "scale(1.0)"},
        leave: {opacity: 0, transform: "scale(1.1)"}
    })

    return transitions.map(({item, props, key}) => (
        <animated.iframe
            key={key}
            style={{...props}}
            src={hash[item]}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.video}
        >

        </animated.iframe>
    ))
}

function ProjectAnimation(props) {
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

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mtID: 0
        }
    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    notate() {
        return (
            <div className={styles.section} id={"notate"}>
                <div className={styles.row}>
                    <NotateImages />
                    <div className={styles.projectDescription}>
                        <h2>Notate (iOS)</h2>
                        <h4>
                            Notate is an iOS app written in Swift which transcribes melodic ideas recorded by the
                            device’s built-in microphone into traditional Western music sheet.
                        </h4>
                        <h4>
                            It functions as a music transcription app, translating audio inputs into sheet music notation
                            output. Users are first directed to a menu page, with “Metronome”, “Lyrics”, “Record a Song”,
                            and “Scores” page options.
                        </h4>
                        <h4>
                            I am responsible for writing the front-end of Notate, including most of the UIs and
                            sheet music rendering.
                        </h4>
                        <h4 style={{fontWeight: "bold"}}>
                            More details about Notate.
                        </h4>
                        <div className={styles.links}>
                            <a className={styles.linkButton} target="_blank" href={"https://www.eecg.utoronto.ca/~jayar/ece1778/notate.pdf"}>
                                <button type="button" className={"btn btn-dark " + styles.btn}>Full Report</button>
                            </a>
                            <a className={styles.linkButton} target="_blank" href={"https://www.youtube.com/watch?v=8w2xvTl8qZ0"}>
                                <button type="button" className={"btn btn-dark " + styles.btn}>Live Demo</button>
                            </a>
                            <a className={styles.linkButton} target="_blank" href={"https://github.com/ece1778-2020/Notate"}>
                                <button type="button" className={"btn btn-dark " + styles.btn}>Source Code</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    magicTower() {
        return (
            <div className={styles.section} id={"magicTower"}>
                <div className={`${styles.row} ${styles.col}`}>
                    <div className={styles.projectDescription}>
                        <h2>
                            Tower of the Sorcerer (Unity)
                        </h2>
                        <h4>
                            Tower of the Sorcerer is a puzzle-solving RPG created in 1998 by Oz, Kenichi, and N.W on the
                            Windows platform.
                        </h4>
                        <h4>
                            For the purpose of practice, I replicated the entire game using Unity and C#.
                        </h4>
                        <h4>
                            Apart from the texture, everything else was recreated based on my understanding of the game.
                        </h4>
                        <div className={styles.links}>
                            <a className={`${styles.linkButton} ${styles.singleButton}`} target="_blank" href={"https://github.com/zzhdsb123/Tower-of-the-Sorcerer"}>
                                <button type="button" className={"btn btn-dark " + styles.btn}>Source Code</button>
                            </a>
                        </div>
                    </div>

                    <div className={styles.separatorContainer}>
                        <div className={styles.separator} />
                    </div>

                    <div>
                        <div className={`${styles.links} ${styles.linksTwo}`}>
                            <button
                                type="button"
                                className={"btn btn-dark " + styles.switchBtn}
                                onClick={() => this.setState({mtID: 0})}
                            >Unity Demo</button>
                            <button
                                type="button"
                                className={"btn btn-dark " + styles.switchBtn}
                                onClick={() => this.setState({mtID: 1})}
                            >Playthrough Demo</button>
                        </div>
                        <div className={styles.videoOuterContainer}>
                            <MagicTowerVideos id={this.state.mtID} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    fakeIns() {
        return (
            <div className={styles.section} id={"fakeIns"}>
                <div className={`${styles.row} ${styles.col}`}>
                    <div className={styles.videoOuterContainer}>
                        <iframe
                            src={"https://www.youtube.com/embed/xcwiA4dIzHQ"}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.video}
                        />
                    </div>
                    <div className={styles.projectDescription}>
                        <h2>Fake Instagram (iOS)</h2>
                        <h4>An iOS app written in Swift (SwiftUI) which allows users to share photos as well as the the
                            corresponding comments with others.</h4>
                        <h4>
                            Used Google Firebase to perform user authentication and data storage.
                        </h4>
                        <div className={styles.links}>
                            <a className={`${styles.linkButton} ${styles.singleButton}`} target="_blank" href={"https://github.com/zzhdsb123/ECE1778-Fake-Instagram"}>
                                <button type="button" className={"btn btn-dark " + styles.btn}>Source Code</button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    myWeb() {
        return (
            <div className={`${styles.section} ${styles.lastSection}`} id={"myWeb"}>
                <div className={`${styles.row} ${styles.col}`}>
                    <div className={styles.projectDescription}>
                        <h2>This Portfolio Website</h2>
                        <h4>A single page app.</h4>
                        <h4>Backend written using node.js and express.js.</h4>
                        <h4>Frontend written using react.js.</h4>
                        <h4>Deployed on AWS.</h4>
                    </div>
                    <a href={"/webImageSample"}>
                        <div className={styles.myWebImg}>
                            <img src={"../images/projects/myweb.png"} />
                        </div>
                    </a>

                </div>
            </div>
        )
    }

    render() {
        return (
            <div  className={styles.main}>
                <h2 className={styles.title}>My recent projects.</h2>
                {this.notate()}
                <ProjectAnimation id={"magicTower"} content={this.magicTower()} />
                <ProjectAnimation id={"fakeIns"} content={this.fakeIns()} />
                <ProjectAnimation id={"myWeb"} content={this.myWeb()} />
            </div>
        )
    }
}

export default Project