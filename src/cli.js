import { program } from "commander";
import { checkDirectoryCli } from "./cli/checkDirectory.js";

program
  .command("check <directory>")
  .description("check file(s) with w3c validator")
  .option(
    "-t, --throwError",
    "throw error when w3c validator response error",
    false
  )
  .action(checkDirectoryCli);

program.parse();
