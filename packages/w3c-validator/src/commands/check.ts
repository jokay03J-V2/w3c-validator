import { Command, Flags } from "@oclif/core";
import { CommandError } from "@oclif/core/lib/interfaces";
import { red, yellow, blue } from "chalk";
import { checkFile } from "w3c-validator-wrapper";
import { displayMessage } from "../utils/displayMessage";

export default class Check extends Command {
  static description = "submit content file on W3C";

  static examples = [
    "<%= config.bin %> <%= command.id %> path/to/file.html",
    "<%= config.bin %> <%= command.id %> path/to/file.html -t",
  ];

  static flags = {
    throwError: Flags.boolean({ char: "t" }),
  };

  static args: any = {
    file: Flags.file({
      name: "file",
      required: true,
      exists: true,
      description: "path to html file",
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Check);
    const messages = await checkFile(args.file);
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
    this.exit(1);
  }
}
