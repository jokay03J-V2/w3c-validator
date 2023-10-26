import * as vscode from "vscode";
import { checkContent } from "w3c-validator-wrapper";

export default async function run() {
  if (vscode.window.activeTextEditor) {
    const text = vscode.window.activeTextEditor.document.getText();
    vscode.window.withProgress(
      {
        cancellable: false,
        location: vscode.ProgressLocation.Notification,
      },
      async (progress) => {
        progress.report({ message: "fetching..." });
        const result = await checkContent(text);
        if (result.length > 0) {
          const errors = result.filter((m) => m.type === "error");
          const infos = result.filter((m) => m.type === "info");
          const warnings = result.filter((m) => m.type === "warning");

          if (errors.length > 0) {
            vscode.window.showErrorMessage(`Found ${errors.length} errors`);
          } else if (warnings.length > 0) {
            vscode.window.showWarningMessage(
              `Found ${warnings.length} warnings`
            );
          } else if (infos.length > 0) {
            vscode.window.showInformationMessage(`Found ${infos.length} infos`);
          } else {
            vscode.window.showInformationMessage("Run detailed report command");
          }
        } else {
          vscode.window.showInformationMessage("This file is clean");
        }
      }
    );
  }
}
