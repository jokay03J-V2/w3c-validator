# W3C Validator

> W3C validator is a cli and provide apis to check html file or url

## CLI

### How to use ?

#### Install package

```
npm i @jokay03j-v2/w3c-validator -g
```

#### Run cli

##### check local file

```bash
w3c-validator check <path to html file> -t
```

##### check url

> w3c-validator use [Puppeteer](<[https](https://pptr.dev/)>)
> to run html file and evaluate Javascript.

```bash
w3c-validator checkUrl <your url> -t
```
