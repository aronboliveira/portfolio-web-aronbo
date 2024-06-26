import { nullishHeader } from "@/app/lib/declarations/types";
import { htmlElementNotFound } from "@/app/lib/handlers/handlersErrors";
import { fillWithTag } from "@/app/lib/handlers/handlersStyle";
import { useEffect, useRef } from "react";
import PlaceholderKipperHeader from "./PhKipperHeader";

export default function HomeHeader(): JSX.Element {
  const mainRef = useRef<nullishHeader>(null);
  useEffect(() => {
    try {
      if (
        !(
          mainRef.current instanceof HTMLElement &&
          mainRef.current.tagName === "HEADER"
        )
      )
        throw htmlElementNotFound(
          mainRef.current,
          `validation of Main Reference in ${HomeHeader.prototype.constructor.name}`,
          ["<footer>"]
        );
      fillWithTag(mainRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for mainRef in ${
          HomeHeader.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mainRef]);
  return (
    <header id="home-header" ref={mainRef} className="sc-dcJsrY cXjjYJ">
      <PlaceholderKipperHeader />
    </header>
  );
}
