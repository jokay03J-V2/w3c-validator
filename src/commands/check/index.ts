import { Command, Args, Flags, ux } from "@oclif/core";
import { checkFile } from "../../core/checkFile";
import { red, redBright, gray } from "chalk";
import { _displayMessage } from "../../utils/displayMessage";

export class Check extends Command {
  static args = {
    file: Args.file({
      name: "file",
      required: true,
      exists: true,
    }),
  };

  static flags = { throwError: Flags.boolean({ char: "t" }) };

  static description = "check file on W3C Validator";

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Check);
    try {
      if (!args.file.endsWith(".html"))
        this.error("You must point html file !");
      ux.action.start("fetching file");
      const messages = await checkFile(args.file);
      ux.action.stop();

      _displayMessage(messages);

      const errors = messages.filter((message) => message.type === "error");
      if (flags.throwError && errors.length > 0) {
        return ux.error(
          redBright(
            `Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`
          )
        );
      }

      ux.log(
        gray(`Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`)
      );
    } catch (error: any) {
      switch (error.message) {
        case "Directory no exist":
          this.error(red("Path not valid."));
          break;
        case "Is directory not file":
          this.error(red("is a directory"));
          break;

        default:
          this.error(red(error.message));
          break;
      }
    }
  }
}
