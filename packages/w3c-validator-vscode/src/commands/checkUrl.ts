import * as vscode from "vscode";
import { checkUrl } from "w3c-validator-wrapper";
import { LoggingService } from "../loginService";
import { showDetailedReport } from "../utils/showDetailedReport";
export default async function run() {
  const input = await vscode.window.showInputBox({
    title: "Url to be checked",
    validateInput: (val) => {
      try {
        // if new URL doesn't throw a error, url is valid
        if (new URL(val)) {
          return null;
        }
      } catch (err) {
        return "Url is not valid eg: https://exemple.com";
      }
    },
  });

  if (input) {
    try {
      vscode.window.withProgress(
        {
          cancellable: false,
          location: vscode.ProgressLocation.Notification,
        },
        async (progress) => {
          progress.report({ message: "Fetching..." });
          const result = await checkUrl(input);
          showDetailedReport(result);
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        LoggingService.error(error);
      } else {
        LoggingService.log("Got unknow error", error);
      }
    }
  }
}
