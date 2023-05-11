import * as fs from "fs";
import axios from "axios";

/**
 * get w3c validator response with file directory
 * @param {string} directory directory
 * @param {*} options
 * @since 0.0.1
 * @supportedFiles html
 * @returns {object[]}
 */
export async function checkDirectory(directory, options) {
  if (!fs.existsSync(directory)) {
    throw new Error("Directory no exist");
  }

  if (fs.lstatSync(directory).isDirectory()) {
    throw new Error("Is directory not file");
  }

  const file = fs.readFileSync(directory);
  const res = await axios.post("https://validator.w3.org/nu/?out=json", file, {
    headers: {
      "Content-Type": "text/html",
      charset: "utf-8",
    },
  });
  const messages = res.data.messages;
  return messages;
}
