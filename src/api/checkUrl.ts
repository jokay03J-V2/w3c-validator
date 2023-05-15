import puppeteer from "puppeteer";

/**
 * submit html file from url
 * @since 1.0.1
 */
export async function checkUrl(url: string) {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(`${url}`);
    const data = await page.content();
    await browser.close();
    return data;
  } catch (error) {
    return error;
  }
}
