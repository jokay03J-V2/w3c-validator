import * as vscode from "vscode";
import { checkContent } from "w3c-validator-wrapper";
import { showDetailedReport } from "../utils/showDetailedReport";

export default async function run() {
  if (vscode.window.activeTextEditor) {
    const doc = vscode.window.activeTextEditor.document;
    const text = doc.getText();
    vscode.window.withProgress(
      {
        cancellable: false,
        location: vscode.ProgressLocation.Notification,
      },
      async (progress) => {
        progress.report({ message: "Fetching..." });
        const result = await checkContent(text, "text/" + doc.languageId);
        showDetailedReport(result);
      }
    );
  }
}
