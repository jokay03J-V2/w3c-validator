import { ux } from "@oclif/core";
import { red, blue, yellow, magenta, grey, bgGray, bgBlack } from "chalk";
import type { responseMessage } from "w3c-validator-wrapper";

/**
 * INTERNAL display each response message
 * @internal
 * @private
 */
export function displayMessage(messages: responseMessage[]): void {
  for (const message of messages) {
    switch (message.type) {
      case "error":
        ux.log(
          red(message.type),
          bgGray(
            `line: ${isNaN(message.lastLine!) ? "unknow" : message.lastLine}`
          ),
          message.message
        );
        ux.log(bgBlack.underline(message.extract ? message.extract : "unknow"));
        break;

      case "info":
        ux.log(
          blue(message.type),
          bgGray(
            `line: ${isNaN(message.lastLine!) ? "unknow" : message.lastLine}`
          ),
          message.message
        );
        ux.log(bgBlack.underline(message.extract ? message.extract : "unknow"));
        break;

      case "warning":
        ux.log(
          yellow(message.type),
          bgGray(
            `line: ${isNaN(message.lastLine!) ? "unknow" : message.lastLine}`
          ),
          message.message
        );
        ux.log(bgBlack.underline(message.extract ? message.extract : "unknow"));
        break;

      case "fatal":
        ux.log(
          magenta(message.type),
          bgGray(
            `line: ${isNaN(message.lastLine!) ? "unknow" : message.lastLine}`
          ),
          message.message
        );
        ux.log(bgBlack.underline(message.extract ? message.extract : "unknow"));
        break;

      default:
        ux.log(
          grey(message.type),
          bgGray(
            `line: ${isNaN(message.lastLine!) ? "unknow" : message.lastLine}`
          ),
          message.message
        );
        ux.log(bgBlack.underline(message.extract ? message.extract : "unknow"));
        break;
    }
  }
}
