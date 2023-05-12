#! /usr/bin/env node
import { Command } from "commander";
import { checkDirectoryCli } from "./cli/checkDirectory";
export const client = new Command("w3c-validator");

client
  .command("check <directory>")
  .description("check file with w3c validator")
  .option(
    "-t, --throwError",
    "throw error when w3c validator response error",
    false
  )
  .action(checkDirectoryCli);

client.parse();
