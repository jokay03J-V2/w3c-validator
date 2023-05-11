import axios from "axios";
import { program } from "commander";
import * as fs from "fs";
import chalk from "chalk";

program
  .command("check <directory>")
  .description("check file(s) with w3c validator")
  .option(
    "-t, --throwError",
    "throw error when w3c validator response error",
    false
  )
  .action(async (directory, options) => {
    if (!fs.existsSync(directory)) {
      return program.error("path to file is invalid");
    }

    if (fs.lstatSync(directory).isDirectory()) {
      return program.error("path is a directory");
    }

    const file = fs.readFileSync(directory);
    const res = await axios.post(
      "https://validator.w3.org/nu/?out=json",
      file,
      {
        headers: {
          "Content-Type": "text/html",
          charset: "utf-8",
        },
      }
    );
    const messages = res.data.messages;
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

    return console.log(chalk.gray(`Found ${errors.length} error !`));
  });

program.parse();
