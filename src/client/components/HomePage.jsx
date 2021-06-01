import React from "react";
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom";

const HomePage = () => {

    return (
        <>
            <div id="home-page-container" className="card-container">
                <div id="home-page-banner" className="card">
                    <div id="home-page-banner-fade">
                        <div id="home-page-banner-content-wrapper">
                            <h1>HOLOSEUM</h1>
                            <p>
                                Et mobilt mini-museum som gir deg en smakebit av et ekte museum.
                                Sammen med våre samarbeidspartnere har
                                vi designet 3D-modeller av museumsgjenstander som kan vises hvor som helst!
                            <br />
                                <br />
                            Museumsgjenstandene vises som et 3D-hologram via et nettbrett.
                            Velg blant de ulike muséene og få tilsendt det du trenger for å utforske norsk historie!
                            <br />
                                <br />
                            Bla ned for å se hvordan det fungerer.
                            </p>
                            <Link to="/kontakt">
                                <Button id="contact-btn">
                                    KONTAKT OSS
                            </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div id="div-center" className="card" data-aos="fade-up"></div>
                <div id="div-1" className="guide-point card" data-aos="fade-up" data-aos-offset="400"></div>
                <div id="div-2" className="guide-point card" data-aos="fade-up" data-aos-delay="500"></div>
                <div id="div-3" className="guide-point card" data-aos="fade-up" data-aos-delay="500"></div>
            </div>
        </>
    )
}

export default HomePage;