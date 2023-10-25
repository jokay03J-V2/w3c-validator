import { before, describe } from "mocha";
import { checkFile, responseMessage } from "../src";
import { expect } from "chai";
import { join } from "path";

describe("checkFile", () => {
  const actual = join(__dirname, "./file/test.html").replace("file:", "");
  let result: responseMessage[];
  before(async () => {
    result = await checkFile(actual);
  });
  it("should be return an array of messages", () => {
    expect(result).is.instanceOf(Array);
  });
});
