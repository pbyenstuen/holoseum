import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import useSubmit from "../../hooks/useSubmit";

const Header = ({ api, user, updateUser }) => {
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
                            <NavLink activeClassName="is-active" to='/admin'>ADMIN</NavLink>
                        </li>
                    }
                </ul>
            </nav>
            {user && <button disabled={submitting} onClick={handleLogout}>LOGG UT</button>}
        </header>
    )
}

export default Header;