import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { PageState } from "../store/page/page.typings";
import { AppDispatch } from "../store/store";
import { setActivePage } from "../store/page/page.slice";

export default function OnNavigation() {

  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const pageState = useSelector<{ page: PageState }, PageState>((state) => state.page);

  useEffect(() => {
    Object.keys(pageState).some((key) => {
        const page = key as keyof PageState;
        const pageData = pageState[page];

        if (pathname === pageData.link) {
            window.scrollTo(0, 0);
        }
        
        if (pathname.includes(pageData.link)) {
            dispatch(setActivePage(page));
        }
        return false;
    })
  }, [ pathname ]);

  return null;
}