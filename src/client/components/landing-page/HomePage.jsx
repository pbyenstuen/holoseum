import React from "react";
import { Button } from "semantic-ui-react"
import { Link } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";
import guideStep1 from "url:/img/guide-step-1.gif";
import guideStep2 from "url:/img/guide-step-2.gif";
import guideStep3 from "url:/img/guide-step-3.gif";

const HomePage = () => {
    const mobile = useMediaQuery("(max-width: 768px)");

    return (
        <>
            <div id="home-page-container">
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

                <div tabIndex="0" id="guide-container">
                    <div className="guide-point card" data-aos="fade-up">
                        <h2>1</h2>
                        <img src={guideStep1} alt="Animasjon - guide steg 1" />
                        <p>Sett sammen stativet</p>
                    </div>

                    <div className="guide-point card" data-aos="fade-up" data-aos-delay={!mobile ? "500" : ""}>
                        <h2>2</h2>
                        <img src={guideStep2} alt="Animasjon - guide steg 2" />
                        <p>Bruk et nettbrett og skann en QR-kode på kartet i brosjyren</p>
                    </div>

                    <div className="guide-point card" data-aos="fade-up" data-aos-delay={!mobile ? "1000" : ""}>
                        <h2>3</h2>
                        <img src={guideStep3} alt="Animasjon - guide steg 3" />
                        <p>Legg nettbrettet på toppen av stativet, og hologrammet vil vises</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;