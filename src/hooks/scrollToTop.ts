import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageState } from "../store/page/page.typings";

export default function ScrollToTop() {

  const { pathname } = useLocation();
  const pageState = useSelector<{ page: PageState }, PageState>((state) => state.page);

  useEffect(() => {
    Object.keys(pageState).some((key) => {
        const page = pageState[key as keyof PageState];
        if (pathname === page.link) {
            window.scrollTo(0, 0);
            return true;
        }
        return false;
    })
  }, [ pathname ]);

  return null;
}