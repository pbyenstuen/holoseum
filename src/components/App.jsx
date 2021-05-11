import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import HomePage from "./HomePage";

const App = () => {

    return (
        <Router>
            <>
                <HeaderBar />
                <Switch>
                    <Route path="/">
                        <HomePage />
                    </Route>
                </Switch>
            </>
        </Router>
    )
}

export default App;