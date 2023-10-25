import { expect } from "chai";
import { describe, it } from "mocha";
import { checkContent, responseMessage } from "../src/index";

describe("testContent", () => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <img src="" alt="" id="img whitout alt" />
  </body>
</html>
`;
  let result: responseMessage[];
  before(async () => {
    result = await checkContent(html);
  });
  it("should be return an array of messages", async () => {
    // check if result is array
    expect(result).is.instanceOf(Array);
  });
});
