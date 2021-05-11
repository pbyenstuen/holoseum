import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";

const App = () => {

    return (
        <Router>
            <>
                <HeaderBar />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/kontakt">
                        <ContactPage />
                    </Route>
                </Switch>
            </>
        </Router>
    )
}

export default App;