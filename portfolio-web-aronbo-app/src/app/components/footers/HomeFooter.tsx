import { nullishFooter } from "@/app/lib/declarations/types";
import { htmlElementNotFound } from "@/app/lib/handlers/handlersErrors";
import { fillWithTag } from "@/app/lib/handlers/handlersStyle";
import { useEffect, useRef } from "react";

export default function HomeFooter(): JSX.Element {
  const mainRef = useRef<nullishFooter>(null);
  useEffect(() => {
    try {
      if (
        !(
          mainRef.current instanceof HTMLElement &&
          mainRef.current.tagName === "FOOTER"
        )
      )
        throw htmlElementNotFound(
          mainRef.current,
          `validation of Main Reference in ${HomeFooter.prototype.constructor.name}`,
          ["<footer>"]
        );
      fillWithTag(mainRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for mainRef in ${
          HomeFooter.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mainRef]);
  return <footer id="home-footer" ref={mainRef}></footer>;
}
