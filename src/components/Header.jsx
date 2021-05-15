import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {

    return (
        <header>
            <nav>
                <ul>
                    <li>
                        <NavLink exact={true} activeClassName="is-active" to='/'>HVA ER?</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="is-active" to='/kontakt'>KONTAKT OSS</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="is-active" to='/bla'>BLABLA</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;