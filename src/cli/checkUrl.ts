import { client } from "..";
import { checkUrl } from "../api";
import { checkContent } from "../api/checkContent";
import chalk from "chalk";

interface optionsInterface {
  throwError: boolean;
}

export async function checkUrlCli(url: string, options: optionsInterface) {
  try {
    const source = await checkUrl(url);
    if (typeof source === "string") {
      const messages = await checkContent(source);
      for (let index = 0; index < messages.length; index++) {
        const message = messages[index];
        switch (message.type) {
          case "error":
            console.log(chalk.red(message.type), message.message);
            console.log(
              `${chalk.bgBlack.whiteBright(
                `[Line: ${message.lastLine}]`,
                message.extract.replace(/(\r\n|\n|\r)/gm, "")
              )}`
            );
            break;

          case "info":
            console.log(chalk.blue(message.type), `${message.message}`);
            console.log(
              `${chalk.bgBlack.whiteBright(
                `[Line: ${message.lastLine}]`,
                message.extract.replace(/(\r\n|\n|\r)/gm, "")
              )}`
            );

            break;
        }
      }

      const errors = messages.filter((message) => message.type === "error");
      if (options.throwError && errors.length > 0) {
        return client.error(
          chalk.redBright(
            `Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`
          )
        );
      }

      console.log(chalk.gray(`Found ${errors.length} error !`));
    } else {
      return client.error(
        chalk.red("invalid URL\ncurrenlty supported: http://, https://")
      );
    }
  } catch (error: any) {
    client.error(chalk.red(error.message));
  }
}
