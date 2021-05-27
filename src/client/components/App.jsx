import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { BlockReserveLoading } from "react-loadingg";
import AOS from "aos";
import "aos/dist/aos.css"
import Header from "./Header";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import Footer from "./Footer";
import HologramView from "./HologramView";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import useLoader from "./useLoader";
import NotFound from "./NotFound";

const App = ({ api }) => {
    const { data: user, loading, reload: updateUser } = useLoader(async () => await api.auth.getUser());

    useEffect(() => {
        AOS.init({
            once: true,
            duration: 1500
        });
    }, []);

    return (
        <Router>
            <Switch>
                <Route path={"/hologrammer/:name"}>
                    <HologramView api={api} />
                </Route>
                <>
                    <Header api={api} user={user} updateUser={updateUser} />
                    <Route exact path={"/"}>
                        <HomePage />
                    </Route>
                    <Route path={"/kontakt"}>
                        <ContactPage />
                    </Route>
                    <Route path={"/admin"}>
                        {loading ? <BlockReserveLoading /> :
                            <>
                                {user ? <AdminPage api={api} /> : <LoginPage api={api} updateUser={updateUser} />}
                            </>
                        }
                    </Route>
                    {/* <Route>
                        <NotFound />
                    </Route> */}
                    <Footer />
                </>
            </Switch>
        </Router>
    )
}

export default App;