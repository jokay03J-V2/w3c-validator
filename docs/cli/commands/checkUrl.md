---
sidebar_position: 2
---

# checkUrl

check html file from a url.

## usage

:::note

w3c-validator use [Puppeteer](https://pptr.dev/) under the hood to evaluate Javascript and return html file.

:::

```bash
w3c-validator checkUrl <url> [-t || --throwError]
```

> [ ] = optionnal<br/>
> < > = required

## options

| option       | alias | description                                                | required |
| ------------ | ----- | ---------------------------------------------------------- | -------- |
| --throwError | -t    | exit program with code 1 when w3c validator response error | false    |

## examples

```bash
w3c-validator checkUrl https://example.com/ -t // or --throwError
```
