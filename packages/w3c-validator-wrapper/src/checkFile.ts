import * as fs from "node:fs";
import axios from "axios";
import { type responseMessage } from "./utils/types";

/**
 * get w3c validator response with html file
 * @since 0.0.1
 */
export async function checkFile(
  directory: string,
  contentType = "text/html"
): Promise<responseMessage[]> {
  if (!fs.existsSync(directory)) {
    throw new Error("Directory no exist");
  }

  if (fs.lstatSync(directory).isDirectory()) {
    throw new Error("Is directory not file");
  }

  if (!directory.endsWith(".html")) {
    throw new Error("Invalid Html file");
  }

  const file = fs.readFileSync(directory);
  const res = await axios.post("https://validator.w3.org/nu/?out=json", file, {
    headers: {
      "Content-Type": contentType,
      charset: "utf-8",
    },
  });
  const messages: responseMessage[] = res.data.messages;
  return messages;
}
