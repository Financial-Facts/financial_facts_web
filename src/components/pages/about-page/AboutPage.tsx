import PageLayout from "../../templates/page-layout/page-layout";
import Header from "../../organisms/header/Header";
import AboutSection from "../../molecules/about-section/AboutSection";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CONSTANTS } from "../../../constants/constants";

function AboutPage() {

    const location = useLocation();
    const lastHash = useRef(CONSTANTS.EMPTY);

    useEffect(() => {
        if (location.hash) {
        lastHash.current = location.hash.slice(1); 
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            const element = document.getElementById(lastHash.current);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            lastHash.current = CONSTANTS.EMPTY;
        }
    }, [ location ]);

    return (
        <PageLayout sections={[
            <Header key='header' text="About Us" subtext="Origins, philosophy and more"/>,
            <AboutSection key='about-section'/>
        ]}/>
    )
}

export default AboutPage;  