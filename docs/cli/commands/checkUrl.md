---
sidebar_position: 2
---

# checkUrl

check html file from a url.

## usage

:::note

w3c-validator use [Puppeteer](https://pptr.dev/) to evaluate Javascript and return html file.

:::

```bash
w3c-validator checkUrl <url> [-t || --throwError]
```

> [ ] = optionnal<br/>
> < > = required

## options

| option       | alias | description                                   | required |
| ------------ | ----- | --------------------------------------------- | -------- |
| --throwError | -t    | throw error when w3c validator response error | false    |

## exemples

```bash
w3c-validator checkUrl <directory> -t // or --throwError
```
