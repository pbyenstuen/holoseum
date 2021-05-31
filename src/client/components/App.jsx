import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"
import PublicRoute from "../hocs/PublicRoute";
import ProtectedRoute from "../hocs/ProtectedRoute";
import useLoader from "../hooks/useLoader";
import Header from "./Header";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";
import HologramView from "./HologramView";
import AdminPage from "./AdminPage";
import NotFound from "./NotFound";

const App = ({ api }) => {
    const { data: user, loading, reload: updateUser } = useLoader(async () => await api.auth.getUser());

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1500
        });
    }, []);

    const LandingLayout = ({ children }) => {
        return (
            <>
                <Header
                    api={api}
                    user={user}
                    updateUser={updateUser} />
                {children}
                <Footer />
            </>
        )
    }

    return (
        <Router>
            <Switch>
                <PublicRoute
                    path={"/hologrammer/:name"}
                    component={HologramView}
                    api={api} />
                <PublicRoute
                    exact path={"/"}
                    component={HomePage}
                    layout={LandingLayout} />
                <PublicRoute
                    path={"/kontakt"}
                    component={ContactPage}
                    layout={LandingLayout} />
                <ProtectedRoute
                    path={"/admin"}
                    component={AdminPage}
                    layout={LandingLayout}
                    user={user}
                    loading={loading}
                    updateUser={updateUser}
                    api={api} />
                <Route
                    path={"*"}
                    component={NotFound} />
            </Switch >
        </Router >
    )
}

export default App;