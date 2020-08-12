import React from "react"
import ReactDOM from 'react-dom'
import NavBar from "./nav-bar";
import { BrowserRouter as BR, Switch, Route } from "react-router-dom";
import Home from "./home";
import About from "./about";
import Project from "./project";


class Index extends React.Component {
    render() {
        return (
            <BR>
                <div>
                    <NavBar />
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/about" exact>
                            <About />
                        </Route>
                        <Route path="/project" exact>
                            <Project />
                        </Route>
                    </Switch>
                </div>
            </BR>

        )
    }
}

ReactDOM.render(<Index />, document.getElementById("root"))