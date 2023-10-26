// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import checkFileCommand from "./commands/checkFile";
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "w3c-validator.checkfile",
    checkFileCommand
  );

  const statusBar = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  );
  statusBar.command = "w3c-validator.checkfile";
  statusBar.text = "$(check) W3C Ready to check";
  statusBar.show();

  context.subscriptions.push(disposable);
  context.subscriptions.push(statusBar);
  context.subscriptions.push(
    vscode.workspace.onDidSaveTextDocument(() => {
      const config = vscode.workspace.getConfiguration("w3c-validator");
      const toBeCheck: boolean | undefined = config.get("checkFileOnSave");
      if (toBeCheck) {
        checkFileCommand();
      }
    })
  );
}
