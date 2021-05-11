import React from "react";
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <div id="home-page-container" className="card-container">
            <div className="card">
                <div id="product-name-container">
                    <h1>PRODUCT NAME</h1>
                </div>
                <div id="product-info-container">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. At commodi sed repellat magni,
                        voluptas eligendi quae eveniet quo fugiat unde beatae excepturi culpa!
                        Necessitatibus dolorem facere, esse similique libero consectetur!
                    </p>
                    <Link to="/kontakt">
                        <Button id="contact-btn">
                            <p>KONTAKT OSS</p>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
