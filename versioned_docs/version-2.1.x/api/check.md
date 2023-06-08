---
sidebar_position: 1
---

# check

return W3C Validation Markup Service response from a html file.

```ts
interface responseMessage {
  type: string;
  subType?: string;
  message: string;
  lastLine: number;
  lastColumn: number;
  firstColumn: number;
  extract: string;
  hiliteStart: number;
  hiliteLenght: number;
}

checkDirectory(pathToFile: string): Promise<responseMessage[]>
```
