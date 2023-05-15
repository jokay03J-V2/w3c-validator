#! /usr/bin/env node
import { Command } from "commander";
import { checkDirectoryCli } from "./cli/checkDirectory";
import { checkUrlCli } from "./cli/checkUrl";
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

client
  .command("checkUrl <url>")
  .description("check url response with w3c validator")
  .option(
    "-t, --throwError",
    "throw error when w3c validator response error",
    false
  )
  .action(checkUrlCli);

client.parse();
