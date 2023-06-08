import axios from "axios";
import { responseMessage } from "../utils/types";

/**
 * Submit html to w3c.
 * @since 1.1.0
 */
export async function checkContent(
  content: string
): Promise<responseMessage[]> {
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
