"use client";

import { createContext, useEffect, useState } from "react";
import HomeFooter from "./footers/HomeFooter";
import HomeHeader from "./headers/HomeHeader";
import HomeMainBody from "./mainBodies/HomeMainBody";
import { voidishAppContext } from "../lib/declarations/types";
import { useDispatch } from "react-redux";
import { setRouter } from "../redux/slices/routerSlice";
import { RoutedProps } from "../lib/declarations/interfaces";
import { applyDefaultPoppins } from "../lib/handlers/handlersStyle";

export const AppHomeContext = createContext<voidishAppContext>(undefined);

export default function Home(props: RoutedProps) {
  const dispatch = useDispatch();
  const [_, setDispatch] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setRouter(props.router));
    setDispatch(true);
  }, [dispatch]);
  useEffect(() => {
    applyDefaultPoppins();
  }, []);
  return (
    <div id="homeRoot">
      <AppHomeContext.Provider value={{ router: undefined }}>
        <HomeHeader />
        <HomeMainBody />
        <HomeFooter />
        <div id="modalRoot" style={{ width: "0", height: "0" }}></div>
      </AppHomeContext.Provider>
    </div>
  );
}
