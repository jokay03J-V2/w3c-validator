import chalk from "chalk";
import { program } from "commander";
import { checkDirectory } from "../api/checkDirectory.js";

interface optionsInterface {
  throwError: boolean;
}

export async function checkDirectoryCli(
  directory: string,
  options: optionsInterface
) {
  try {
    const messages = await checkDirectory(directory);

    for (let index = 0; index < messages.length; index++) {
      const message = messages[index];
      switch (message.type) {
        case "error":
          console.log(chalk.red(message.type), message.message);
          break;

        case "info":
          console.log(chalk.blue(message.type), message.message);
          break;
      }
    }

    const errors = messages.filter((message) => message.type === "error");
    if (options.throwError && errors.length > 0) {
      return program.error(
        chalk.redBright(
          `Found ${errors.length} error${errors.length > 1 ? "s" : ""} !`
        )
      );
    }

    console.log(chalk.gray(`Found ${errors.length} error !`));
  } catch (error) {
    switch (error.message) {
      case "Directory no exist":
        program.error("path not valid");
        break;
      case "Is directory not file":
        program.error("is a directory");
        break;
    }
  }
}
