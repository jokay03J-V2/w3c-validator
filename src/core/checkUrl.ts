import puppeteer from "puppeteer";

/**
 * return html content from a url
 * @since 1.0.1
 */
export async function checkUrl(url: string): Promise<string> {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    await page.goto(`${url}`);
    const data = await page.content();
    await browser.close();
    return data;
  } catch (error) {
    throw error;
  }
}
