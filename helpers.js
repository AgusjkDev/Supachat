import { regex } from "data";

export const reduceSpaces = str => str.replace(regex.removeExtraSpaces, " ").trim();
