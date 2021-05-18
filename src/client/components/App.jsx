import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import Header from "./Header";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";
import Item from "./Item";
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
            <>
                <Header />
                <Switch>
                    <Route exact path="/">
                        <HomePage />
                    </Route>
                    <Route path="/kontakt">
                        <ContactPage />
                    </Route>
                    <Route path="/items/:id">
                        <Item api={api} />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
                <Footer />
            </>
        </Router>
    )
}

export default App;