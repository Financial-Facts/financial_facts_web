import PageLayout from "../../templates/page-layout/page-layout";
import Header from "../../organisms/header/Header";
import AboutSection from "../../molecules/about-section/AboutSection";

function AboutPage() {

    return (
        <PageLayout sections={[
            <Header key='header' text="About Us" subtext="Origins, philosophy and more"/>,
            <AboutSection key='about-section'/>
        ]}/>
    )
}

export default AboutPage;  