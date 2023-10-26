import { window } from "vscode";

export class LoggingService {
  private static outputChannel = window.createOutputChannel("W3C-validator");

  public static log(message: string, data?: unknown) {
    this.outputChannel.appendLine(message);
    if (data) {
      this.outputChannel.appendLine(JSON.parse(data as string));
    }
  }

  public static error(error: Error) {
    this.outputChannel.appendLine("ERROR " + error.name);
    this.outputChannel.appendLine(error.message);
    this.outputChannel.appendLine(error.stack ?? "unknow stack trace");
  }
}
