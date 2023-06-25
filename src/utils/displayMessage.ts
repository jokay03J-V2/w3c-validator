import { ux } from "@oclif/core";
import { type responseMessage } from "./types";
import { red, blue, yellow, magenta, grey, bgGray, bgBlack } from "chalk";

/**
 * INTERNAL display each response message
 * @internal
 * @private
 */
export function _displayMessage(messages: responseMessage[]): void {
  for (const message of messages) {
    switch (message.type) {
      case "error":
        ux.log(
          red(message.type),
          bgGray(`line: ${message.lastLine}`),
          message.message
        );
        ux.log(bgBlack.underline(message.extract));
        break;

      case "info":
        ux.log(
          blue(message.type),
          bgGray(`line: ${message.lastLine}`),
          message.message
        );
        ux.log(bgBlack.underline(message.extract));
        break;

      case "warning":
        ux.log(
          yellow(message.type),
          bgGray(`line: ${message.lastLine}`),
          message.message
        );
        ux.log(bgBlack.underline(message.extract));
        break;

      case "fatal":
        ux.log(
          magenta(message.type),
          bgGray(`line: ${message.lastLine}`),
          message.message
        );
        ux.log(bgBlack.underline(message.extract));
        break;

      default:
        ux.log(
          grey(message.type),
          bgGray(`line: ${message.lastLine}`),
          message.message
        );
        ux.log(bgBlack.underline(message.extract));
        break;
    }
  }
}
