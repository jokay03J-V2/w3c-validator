import { window } from "vscode";

export class LoggingService {
  private outputChannel = window.createOutputChannel("W3C-validator");

  public log(message: string, data?: unknown) {
    this.outputChannel.appendLine(message);
    if (data) {
      this.outputChannel.appendLine(JSON.parse(data as string));
    }
  }
}
