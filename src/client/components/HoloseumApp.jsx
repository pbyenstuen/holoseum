import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import useLoader from "../hooks/useLoader";
import PublicRoute from "../hocs/PublicRoute";
import ProtectedRoute from "../hocs/ProtectedRoute";
import HomePage from "./landing-page/HomePage";
import ContactPage from "./landing-page/ContactPage";
import HologramView from "./hologram-view/HologramView";
import AdminPage from "./admin/AdminPage";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
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