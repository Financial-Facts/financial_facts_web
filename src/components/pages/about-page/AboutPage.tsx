import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { setActivePage } from "../../../store/page/page.slice";
import PageLayout from "../../templates/page-layout/page-layout";
import Header from "../../organisms/header/Header";

function AboutPage() {

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(setActivePage('About'));
    }, []);

    return (
        <PageLayout sections={[
            <Header key='header' text="About Us" subtext="Origins, philosophy and more"/>
        ]}/>
    )
}

export default AboutPage;  