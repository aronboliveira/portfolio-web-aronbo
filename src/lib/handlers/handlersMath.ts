import { stringError, typeError } from "./handlersErrors";

export function parseFinite(
  value: string,
  context: string = "float",
  def: number = 0
): number {
  try {
    if (typeof value !== "string")
      throw typeError(value, `reading first argument of parseFinite`, [
        "string",
      ]);
    if (typeof context !== "string")
      throw typeError(context, `reading second argument of parseFinite`, [
        "string",
      ]);
    if (context !== "int" && context !== "float")
      throw stringError(context, '"int" or "float"');
    if (typeof def !== "number")
      throw typeError(def, `reading third argument of parseFinite`, ["number"]);
    value = value.replace("px", "");
    // @ts-ignore
    if (Number.isFinite) {
      if (context === "float") {
        if (!Number.isFinite(parseFloat(value))) {
          console.warn(`Error processing parseFloat. Value defaulted`);
          return def;
        } else return parseFloat(value);
      } else {
        if (!Number.isFinite(parseInt(value))) {
          console.warn(`Error processing parseInt. Value defaulted`);
          return def;
        } else return parseInt(value);
      }
    } else {
      console.warn(
        `The current browser does not support ES6. Please update your current active browser. That might result in misleading numbers.`
      );
      if (context === "float") {
        if (isNaN(parseFloat(value)) || parseFloat(value) === Infinity) {
          console.warn(`Error processing parseFloat. Value defaulted`);
          return def;
        } else return parseFloat(value);
      } else {
        if (isNaN(parseInt(value)) || parseInt(value) === Infinity) {
          console.warn(`Error processing parseInt. Value defaulted`);
          return def;
        } else return parseInt(value);
      }
    }
  } catch (err) {
    console.error(`Error executing parseFinite():
    ${(err as Error).message}`);
    return -1;
  }
}
