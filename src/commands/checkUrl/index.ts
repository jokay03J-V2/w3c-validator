import { Command, Args, Flags, ux } from "@oclif/core";
import { red, redBright, blue, gray } from "chalk";
import { checkUrl } from "../../core/checkUrl";
import { checkContent } from "../../core/checkContent";
import { _displayMessage } from "../../utils/displayMessage";

export class CheckUrl extends Command {
  static args = {
    url: Args.url({
      name: "url",
      required: true,
    }),
  };

  static flags = { throwError: Flags.boolean({ char: "t" }) };

  static description = "check url on W3C Validator";

  async run(): Promise<void> {
    const { args, flags } = await this.parse(CheckUrl);
    try {
      ux.action.start("fetching url");
      const content = await checkUrl(args.url.toString());
      ux.action.stop();
      ux.action.start("fetching data");
      const messages = await checkContent(content);
      ux.action.stop();

      _displayMessage(messages);

      const errors = messages.filter((message) => message.type === "error");
      if (flags.throwError && errors.length > 0) {
        return this.error(
          redBright(
            `Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`
          )
        );
      }

      ux.log(
        gray(`Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`)
      );
    } catch (error: any) {
      this.error(red(error.message));
    }
  }
}
