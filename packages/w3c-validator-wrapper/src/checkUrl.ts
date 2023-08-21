import axios from "axios";
import puppeteer from "puppeteer";
import { responseMessage } from "./utils/types";

/**
 * submit page content to w3c and return response
 * @since 1.0.1
 */
export async function checkUrl(
  url: string,
  contentType = "text/html"
): Promise<responseMessage[]> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(`${url}`);
  const data = await page.content();
  await browser.close();
  const res = await axios.post("https://validator.w3.org/nu/?out=json", data, {
    headers: {
      "Content-Type": contentType,
      charset: "utf-8",
    },
  });
  const messages: responseMessage[] = res.data.messages;
  return messages;
}
