import { Command, Flags } from "@oclif/core";
import { checkUrl } from "w3c-validator-wrapper";
import { displayMessage } from "../utils/displayMessage";
import { red, yellow, blue } from "chalk";
import { CommandError } from "@oclif/core/lib/interfaces";

export default class CheckUrl extends Command {
  static description = "submit url on W3C";

  static examples = [
    "<%= config.bin %> <%= command.id %> https://google.com",
    "<%= config.bin %> <%= command.id %> https://exemple.com -t",
  ];

  static flags = {
    throwError: Flags.boolean({ char: "t" }),
  };

  static args: any = {
    url: Flags.url({
      name: "url",
      description: "url to be submited on W3C",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(CheckUrl);
    const messages = await checkUrl(args.file);

    displayMessage(messages);

    const errorCount = messages.filter((m) => m.type === "error").length;
    const warningCount = messages.filter((m) => m.type === "warning").length;
    const infoCount = messages.filter((m) => m.type === "info").length;

    this.log(
      red("Found " + `${errorCount} error(s) `) +
        yellow(`${warningCount} warning(s) `) +
        blue(`${infoCount} info(s)`)
    );

    if (flags.throwError && errorCount > 0) {
      this.exit(1);
    }
  }

  protected async catch(err: CommandError): Promise<any> {
    this.log(red("Error >> " + err.message));
  }
}
