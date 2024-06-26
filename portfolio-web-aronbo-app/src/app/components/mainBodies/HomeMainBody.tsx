import { nullishMain } from "@/app/lib/declarations/types";
import { htmlElementNotFound } from "@/app/lib/handlers/handlersErrors";
import { fillWithTag } from "@/app/lib/handlers/handlersStyle";
import Image from "next/image";
import { useEffect, useRef } from "react";
import PlaceHolderKipperMain from "./PhKipperMain";

export default function HomeMainBody() {
  const mainRef = useRef<nullishMain>(null);
  useEffect(() => {
    try {
      if (
        !(
          mainRef.current instanceof HTMLElement &&
          mainRef.current.tagName === "MAIN"
        )
      )
        throw htmlElementNotFound(
          mainRef.current,
          `validation of Main Reference in ${HomeMainBody.prototype.constructor.name}`,
          ["<footer>"]
        );
      fillWithTag(mainRef.current);
    } catch (e) {
      console.error(
        `Error executing useEffect for mainRef in ${
          HomeMainBody.prototype.constructor.name
        }:\n${(e as Error).message}`
      );
    }
  }, [mainRef]);
  return (
    <main id="home-main">
      <PlaceHolderKipperMain />
    </main>
  );
}
