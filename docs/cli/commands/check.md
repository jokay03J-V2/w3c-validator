---
sidebar_position: 1
---

# check

check html file.

## usage

```bash
w3c-validator check <pathTofile> [-t || --throwError]
```

> [ ] = optionnal<br/>
> < > = required

## options

| option       | alias | description                                                | required |
| ------------ | ----- | ---------------------------------------------------------- | -------- |
| --throwError | -t    | exit program with code 1 when w3c validator response error | false    |

## examples

```bash
w3c-validator check my/path/to/file.html -t // or --throwError
```
