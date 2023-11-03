import { checkContent } from "w3c-validator-wrapper";
import checkFileCommand from "../commands/checkFile";
import * as vscode from "vscode";

enum ActionState {
  global = "Disable",
  report = "Detailed report"
}

export async function showReport(doc: vscode.TextDocument) {
  const text = doc.getText();
  vscode.window.withProgress(
    {
      cancellable: false,
      location: vscode.ProgressLocation.Notification,
    },
    async (progress) => {
      progress.report({ message: "Fetching..." });
      const result = await checkContent(text);
      if (result.length > 0) {
        const errors = result.filter((m) => m.type === "error");
        const infos = result.filter((m) => m.type === "info");
        const warnings = result.filter((m) => m.type === "warning");

        if (errors.length > 0) {
          vscode.window
            .showErrorMessage<ActionState>(
              `Found ${errors.length} errors`,
              ActionState.report,
              ActionState.global
            )
            .then(handleDisable);
        } else if (warnings.length > 0) {
          vscode.window
            .showWarningMessage<ActionState>(
              `Found ${warnings.length} warnings`,
              ActionState.report,
              ActionState.global,
            )
            .then(handleDisable);
        } else if (infos.length > 0) {
          vscode.window
            .showInformationMessage(
              `Found ${infos.length} infos`,
              ActionState.report,
              ActionState.global,
            )
            .then(handleDisable);
        } else {
          vscode.window
            .showInformationMessage<ActionState>(
              "Run detailed report command",
              ActionState.report,
              ActionState.global,
            )
            .then(handleDisable);
        }
      } else {
        vscode.window
          .showInformationMessage<ActionState>(
            "This file is clean",
            ActionState.report,
            ActionState.global,
          )
          .then(handleDisable);
      }
    }
  );
}

function handleDisable(val: ActionState | undefined) {
  if (val !== undefined) {
    const config = vscode.workspace.getConfiguration("w3c-validator");
    switch (val) {
      case ActionState.global:
        // Update settings globaly
        config.update(
          "checkFileOnSave",
          false,
          vscode.ConfigurationTarget.Global
        );
        vscode.window.showInformationMessage(
          "Disabled globaly\nYou can re-activate it on settings"
        );
        break;

      case ActionState.report:
        // run checkFile command
        checkFileCommand();
        break;
    }
    return;
  }
}
