import React from "react";
import { Link } from "react-router-dom";

const HeaderBar = () => {

    return (
        <div id="header-bar">
            <h1>NAVN</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/">HVA ER?</Link>
                    </li>
                    <li>
                        <Link to="/bla">BLA</Link>
                    </li>
                    <li>
                        <Link to="/bla">BLA</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default HeaderBar;