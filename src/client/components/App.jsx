import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import Header from "./Header";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";
import Hologram from "./Hologram";
import AdminPage from "./AdminPage";
import NotFound from "./NotFound";

const App = ({ api }) => {

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1500
        });
    });

    return (
        <Router>
            <Switch>
                <Route path="/hologrammer/:name">
                    <Hologram api={api} />
                </Route>
                <>
                    <Header />
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/kontakt">
                        <ContactPage />
                    </Route>
                    <Route path="/admin">
                        <AdminPage api={api} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                    <Footer />
                </>
            </Switch>
        </Router>
    )
}

export default App;