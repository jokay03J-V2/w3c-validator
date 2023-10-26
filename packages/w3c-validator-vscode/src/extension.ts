import * as vscode from "vscode";
import checkFileCommand from "./commands/checkFile";
import chechUrlCommand from "./commands/checkUrl";
import { showReport } from "./utils/showReport";
import { LoggingService } from "./loginService";

export function activate(context: vscode.ExtensionContext) {
  // create status bar item
  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  statusBar.command = "w3c-validator.checkfile";
  statusBar.text = "$(check) W3C Ready to check";
  statusBar.show();

  // register checkUrl command
  context.subscriptions.push(
    vscode.commands.registerCommand("w3c-validator.checkurl", chechUrlCommand)
  );
  // register check file
  context.subscriptions.push(
    vscode.commands.registerCommand("w3c-validator.checkfile", checkFileCommand)
  );
  //register status bar
  context.subscriptions.push(statusBar);

  // register on save event check current opened file
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument((doc) => {
      const config = vscode.workspace.getConfiguration("w3c-validator");
      const toBeCheck: boolean | undefined = config.get("checkFileOnSave");
      const fileToBeChecked: string | undefined = config.get(
        "fileTypeTobeChecked"
      );
      try {
        if (!fileToBeChecked) {
          throw new Error("Invalid regexp pattern");
        }
        const regex = new RegExp(fileToBeChecked, "g");
        // check
        if (toBeCheck && regex.test(doc.fileName)) {
          showReport(doc);
        }
      } catch (err) {
        if (err instanceof Error) {
          LoggingService.error(err);

          if (err.name === "SyntaxError") {
            vscode.window.showErrorMessage("Invalid Regexp pattern");
          }
        }
      }
    })
  );
}
