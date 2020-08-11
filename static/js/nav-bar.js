import React, {useEffect, useState} from "react";
import styles from "../css/nav-bar.module.css"
import Bg from "./bg";
import { useTransition, animated } from 'react-spring'
import { Link } from "react-router-dom";

function SideBarContent(props) {
    return (
        <div className={styles.sidebarRight}>
            <ul>
                <li><Link to={"/"} onClick={props.click}>Home</Link></li>
                <li><Link to={"about"} onClick={props.click}>About me</Link></li>
                <li>My Projects</li>
                <li>Contact</li>
                <li>Message Board</li>
            </ul>
        </div>
    )
}

function SideBar(propss) {
    console.log(propss)
    const [show, set] = useState(propss.show)
    useEffect(() => {
        set(propss.show)
    }, [propss.show])
    const transitions = useTransition(show, null, {
        from: {opacity: 0, transform: "translateX(50%)"},
        enter: {opacity: 1, transform: "translateX(0)"},
        leave: {opacity: 0, transform: "translateX(50%)"}
    })
    return transitions.map(({ item, key, props }) =>
        item &&
        <animated.div className={styles.sidebar} key={key} style={props}>
            <div className={styles.sidebarLeft} onClick={propss.hideSideBar}/>
            <SideBarContent click={propss.hideSideBar}/>
        </animated.div>)
}

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBar: false
        }
        this.showSideBar = this.showSideBar.bind(this)
        this.hideSideBar = this.hideSideBar.bind(this)
    }

    showSideBar() {
        this.setState({
            sideBar: true
        })
    }

    hideSideBar() {
        this.setState({
            sideBar: false
        })
    }

    render() {
        return (
            <div>
                <div className={styles.main}>
                    <SideBar show={this.state.sideBar} hideSideBar={this.hideSideBar}/>
                    <div className={styles.logo}>
                        Jack Chang
                    </div>
                    <div className={styles.separator}/>
                    <div className={styles.navContent}>
                        <Link to="/" className={styles.link}>Home</Link>
                        <Link to="about" className={styles.link}>About me</Link>
                        <Link to="/" className={styles.link}>My Projects</Link>
                        <Link to="/" className={styles.link}>Contact</Link>
                        <Link to="/" className={styles.link}>Message Board</Link>
                    </div>
                    <div className={styles.hamburger} onClick={this.showSideBar}>
                        <div className={styles.line}/>
                        <div className={styles.line}/>
                        <div className={styles.line}/>
                    </div>

                </div>
                <Bg />

            </div>

        )
    }
}

export default NavBar