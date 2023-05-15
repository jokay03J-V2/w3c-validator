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
 * Submit html to w3c.
 * @since 1.1.0
 */
export async function checkContent(content: string) {
  const res = await axios.post(
    "https://validator.w3.org/nu/?out=json",
    content,
    {
      headers: {
        "Content-Type": "text/html",
        charset: "utf-8",
      },
    }
  );
  const messages: responseMessage[] = res.data.messages;
  return messages;
}
