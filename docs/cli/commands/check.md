---
sidebar_position: 1
---

# check

check html file from a directory.

## usage

:::note

the directory must be point to html file

:::

```bash
w3c-validator check <directory> [-t || --throwError]
```

> [ ] = optionnal<br/>
> < > = required

## options

| option       | alias | description                                   | required |
| ------------ | ----- | --------------------------------------------- | -------- |
| --throwError | -t    | throw error when w3c validator response error | false    |

## exemples

```bash
w3c-validator check <directory> -t // or --throwError
```
