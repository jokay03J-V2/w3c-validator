import * as fs from "fs";
import axios from "axios";

interface responseMessage {
  type: string;
  subType?: string;
  message: string;
  lastLine: number;
  lastColumn: number;
  firstColumn: number;
  extract: string;
  hiliteStart: number;
  hiliteLenght: number;
}

/**
 * get w3c validator response with file directory
 * @since 0.0.1
 */
export async function checkFile(directory: string) {
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
      "Content-Type": "text/html",
      charset: "utf-8",
    },
  });
  const messages: responseMessage[] = res.data.messages;
  return messages;
}
