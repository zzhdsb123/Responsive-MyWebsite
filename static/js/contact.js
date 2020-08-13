import React, { useState, useEffect } from 'react'
import styles from "../css/contact.module.css"
import "../css/bootstrap/css/bootstrap.css"
import { useTransition, animated } from 'react-spring'
import * as EmailValidator from 'email-validator'
import  { Redirect } from 'react-router-dom'

function Alert(propss) {
    const [show, set] = useState(propss.show)
    useEffect(() => {
        set(propss.show)
    }, [propss.show])

    const transitions = useTransition(show, null, {
        from: {opacity: 0, transform: "translateY(-20%)"},
        enter: {opacity: 1, transform: "translateY(0)"},
        leave: {opacity: 0, transform: "translateY(-20%)"}
    })

    return transitions.map(({ item, key, props }) =>
        item &&
        <animated.div className={"alert alert-danger "+ styles.alert } role="alert" key={key} style={props}>
            {propss.content}
        </animated.div>
        )
}

function AfterSubmit(props) {
    return (
        <div className={styles.main}>
            <h2 style={{textAlign: "center"}}>
                {props.message}
            </h2>
        </div>
    )
}

class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showName: false,
            name: "",
            showEmail: false,
            email: "",
            showContent: false,
            content: "",
            nameError: false,
            emailError: false,
            contError: false,
            afterSubmit: false,
            submitMessage: ""
        }
        this.checkNameEmpty = this.checkNameEmpty.bind(this)
        this.checkEmailEmpty = this.checkEmailEmpty.bind(this)
        this.checkContentEmpty = this.checkContentEmpty.bind(this)
    }

    checkNameEmpty(e) {
        if (e.target.value) {
            this.setState({
                showName: true,
                name: e.target.value
            })
        }
        else {
            this.setState({
                showName: false,
                name: e.target.value
            })
        }
    }

    checkEmailEmpty(e) {
        if (e.target.value) {
            this.setState({
                showEmail: true,
                email: e.target.value
            })
        }
        else {
            this.setState({
                showEmail: false,
                email: e.target.value
            })
        }
    }

    checkContentEmpty(e) {
        e.target.style.height = "";
        e.target.style.height = (e.target.scrollHeight) + "px";
        if (e.target.value) {
            this.setState({
                showContent: true,
                content: e.target.value
            })
        }
        else {
            this.setState({
                showContent: false,
                content: e.target.value
            })
        }
    }

    nameClasses() {
        if (this.state.showName) {
            return `${styles.labelName} ${styles.labelNameUp}`
        }
        else {
            return styles.labelName
        }
    }

    emailClasses() {
        if (this.state.showEmail) {
            return `${styles.labelEmail} ${styles.labelEmailUp}`
        }
        else {
            return styles.labelEmail
        }
    }

    contentClass() {
        if (this.state.showContent) {
            return `${styles.labelContent} ${styles.labelContentUp}`
        }
        else {
            return styles.labelContent
        }
    }

    checkAllInput() {
        let ans = true

        if (this.state.name === "") {
            ans = false
            this.setState({
                nameError: true
            })
            setTimeout(() => { this.setState({
                nameError: false
            }) }, 2000);
        }

        if (!EmailValidator.validate(this.state.email)) {
            ans = false
            this.setState({
                emailError: true
            })
            setTimeout(() => { this.setState({
                emailError: false
            }) }, 2000);
        }

        if (this.state.content === "") {
            ans = false
            this.setState({
                contentError: true
            })
            setTimeout(() => { this.setState({
                contentError: false
            }) }, 2000);
        }

        return ans
    }

    submitMessage() {
        if (this.checkAllInput()) {
            const request = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    content: this.state.content,
                })
            }
            fetch("/post/contact", request)
                .then(response => response.json())
                .then(data => {
                    if (data.err) {
                        this.setState({
                            afterSubmit: true,
                            submitMessage: "Looks like something is wrong, please try later."
                        })
                    }
                    else {
                        this.setState({
                            afterSubmit: true,
                            submitMessage: "Thank you very much, your feedback is appreciated."
                        })
                    }
                })
        }
    }

    render() {
        return (
            this.state.afterSubmit ? <AfterSubmit message={this.state.submitMessage}/> :
            <div className={styles.main}>
                <div className={styles.row}>
                    <h2>Contact Jack</h2>
                </div>
                <div className={styles.row}>
                    <form className={styles.form}>
                        <div className={styles.inputContainer}>
                            <input
                                type="text"
                                className={"form-control " + styles.inputName}
                                onChange={this.checkNameEmpty}
                            />
                            <label className={this.nameClasses()}>Your Name</label>

                        </div>
                        <Alert show={this.state.nameError} content={"Invalid Name!"}/>

                        <div className={styles.inputContainer}>
                            <input
                                type="email"
                                className={"form-control " + styles.inputEmail}
                                onChange={this.checkEmailEmpty}
                            />
                            <label className={this.emailClasses()}>Your Email</label>

                        </div>

                        <Alert show={this.state.emailError} content={"Invalid Email!"}/>

                        <div className={styles.inputContainer}>
                            <textarea
                                className={"form-control " + styles.textarea}
                                id={"text-area"}
                                maxLength={1000}
                                onChange={this.checkContentEmpty}
                            >

                            </textarea>
                            <label className={this.contentClass()}>Content</label>
                        </div>

                        <Alert show={this.state.contentError} content={"Please say something!"}/>

                        <button
                            type="button"
                            className={"btn btn-dark " + styles.btn}
                            onClick={this.submitMessage.bind(this)}
                        >Submit</button>

                    </form>
                </div>

            </div>
        );
    }
}

export default Contact