import axios from "axios";
import { type responseMessage } from "./utils/types";

/**
 * Submit raw html content to w3c.
 * @since 1.1.0
 */
export async function checkContent(
  content: string,
  contentType = "text/html"
): Promise<responseMessage[]> {
  const res = await axios.post(
    "https://validator.w3.org/nu/?out=json",
    content,
    {
      headers: {
        "Content-Type": contentType,
        charset: "utf-8",
      },
    }
  );
  const messages: responseMessage[] = res.data.messages;
  return messages;
}
