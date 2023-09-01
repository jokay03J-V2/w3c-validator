---
sidebar_position: 1
---

# checkFile

return W3C Validation Markup Service response from file.

```ts
interface responseMessage {
    type: string;
    subType?: string;
    message: string;
    lastLine?: number;
    lastColumn?: number;
    firstColumn?: number;
    extract?: string;
    hiliteStart?: number;
    hiliteLenght?: number;
}

checkFile(pathToFile: string, contentType?: string): Promise<responseMessage[]>
```
