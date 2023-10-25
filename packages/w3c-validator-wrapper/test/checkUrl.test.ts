import { before, describe } from "mocha";
import { checkUrl, responseMessage } from "../src";
import { expect } from "chai";

describe("checkUrl", () => {
  let result: responseMessage[];
  before(async () => {
    result = await checkUrl("https://example.com");
  });
  it("should be return an array of messages", () => {
    expect(result).is.instanceOf(Array);
  });
});
