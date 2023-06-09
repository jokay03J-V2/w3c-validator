import { ux } from "@oclif/core";
import { type responseMessage } from "./types";
import { red, blue, yellow, magenta, grey } from "chalk";

/**
 * INTERNAL display each response message
 * @internal
 * @private
 */
export function _displayMessage(messages: responseMessage[]): void {
  for (const message of messages) {
    switch (message.type) {
      case "error":
        ux.log(red(message.type), message.message);
        break;

      case "info":
        ux.log(blue(message.type), message.message);
        break;

      case "warning":
        ux.log(yellow(message.type), message.message);
        break;

      case "fatal":
        ux.log(magenta(message.type), message.message);
        break;

      default:
        ux.log(grey(message.type), message.message);
        break;
    }
  }
}
