import { responseMessage } from "w3c-validator-wrapper";
import * as vscode from "vscode";

export function toSafeHtml(str: string) {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&lt;\s*br\s*\/?s*&gt;/g, "<br />");
}

function getDate() {
  const date = new Date();
  const month = date.getMonth().toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padEnd(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  return `${day}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
}

export function showDetailedReport(result: responseMessage[]) {
  const errors = result.filter((m) => m.type === "error");
  const infos = result.filter((m) => m.type === "info");
  const warnings = result.filter((m) => m.type === "warning");
  const panel = vscode.window.createWebviewPanel(
    "detailedResults",
    "Detailed Results",
    vscode.ViewColumn.One
  );

  panel.webview.html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Detailed report</title>
  </head>
  <body>
    <h1>Report results at ${getDate()}</h1>
    <section>
      <h2 style="color: red">Errors</h2>
      <ul style="height: fit-content; width: 100vw">
      ${
        errors.length > 0
          ? errors.reduce(
              (prev, m) =>
                (prev += `<li style="width: 100%">
          <h3 style="width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;">${
            m.message
          }</h3>
          <p>line: ${m.firstColumn ?? "unknow"} - ${m.lastLine ?? "unknow"}</p>
          <pre style="display: block; width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;"><code style="display: block;">${
            toSafeHtml(m.extract!) ?? "no extract available"
          }</code></pre>
        </li>`),
              ""
            )
          : "<li>No errors</li>"
      }
      </ul>
    </section>
    <section>
      <h2 style="color: yellow">Warnings</h2>
      <ul style="height: fit-content; width: 100vw">
      ${
        warnings.length > 0
          ? warnings.reduce(
              (prev, m) =>
                (prev += `<li>
          <h3 style="width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;">${
            m.message
          }</h3>
          <p>line: ${m.firstColumn ?? "unknow"} - ${m.lastLine ?? "unknow"}</p>
          <pre style="display: block; width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;"><code style="display: block;">${
            toSafeHtml(m.extract!) ?? "no extract available"
          }</code></pre>
        </li>`),
              ""
            )
          : "<li>No warnings</li>"
      }
      </ul>
    </section>
    <section>
      <h2 style="color: blue">Infos</h2>
      <ul style="height: fit-content; width: 100vw">
      ${
        infos.length > 0
          ? infos.reduce(
              (prev, m) =>
                (prev += `<li>
          <h3 style="width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;">${
            m.message
          }</h3>
          <p>line: ${m.firstColumn ?? "unknow"} - ${m.lastLine ?? "unknow"}</p>
          <pre style="display: block; width: 100%; word-wrap: break-word; white-space: pre-wrap; word-break: keep-all;"><code style="display: ;">${
            toSafeHtml(m.extract!) ?? "no extract available"
          }</code></pre>
        </li>`),
              ""
            )
          : "<li>No infos</li>"
      }
      </ul>
    </section>
  </body>
</html>
`;
}
