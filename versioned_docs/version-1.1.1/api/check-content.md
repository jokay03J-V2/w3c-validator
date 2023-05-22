---
sidebar_position: 3
---

# checkContent

return W3C Markup Validation Service from row html content.

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

checkContent(content: string): Promise<responseMessage[]>
```
