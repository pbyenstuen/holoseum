import React from "react";
import { NavLink } from "react-router-dom";

const HeaderBar = () => {

    return (
        <div id="header-bar">
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
        </div>
    )
}

export default HeaderBar;