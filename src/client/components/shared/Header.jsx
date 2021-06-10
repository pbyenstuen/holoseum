import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import useSubmit from "../../hooks/useSubmit";

const Header = ({ api, user, updateUser }) => {
    const mobile = useMediaQuery("(max-width: 768px)");
    const history = useHistory();

    const { handleSubmit: handleLogout, submitting } = useSubmit(
        async () => {
            await api.auth.logOut();
        },
        async () => {
            await updateUser();
            history.push("/");
        }
    );

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink exact={true} activeClassName="is-active" to='/'>HVA ER?</NavLink>
                        </li>
                        <li>
                            <NavLink activeClassName="is-active" to='/kontakt'>KONTAKT</NavLink>
                        </li>
                        {
                            user &&
                            <li>
                                {!mobile ?
                                    <NavLink activeClassName="is-active" to='/admin'>ADMIN</NavLink>
                                    :
                                    <NavLink id="mobile-admin-link" activeClassName="is-active" to='/admin'>
                                        <i className="fa fa-cog" title="Admin" aria-label="Admin"></i>
                                    </NavLink>
                                }
                            </li>
                        }
                    </ul>
                </nav>
                {(!mobile && user) && <button disabled={submitting} onClick={handleLogout}>LOGG UT</button>}
            </header>
            {(mobile && user) && <button id="logout-btn" disabled={submitting} onClick={handleLogout}>LOGG UT</button>}
        </>
    )
}

export default Header;