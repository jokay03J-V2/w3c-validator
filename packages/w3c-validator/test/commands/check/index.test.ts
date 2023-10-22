import {expect, test} from '@oclif/test'
import {join} from 'path'
import {writeFile} from 'node:fs'

const root = join(import.meta.url, '../../../')
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>`
writeFile('./tmp/test.html', htmlContent, () => console.log('Created test html file'))

describe('check file', () => {
  test
    .loadConfig({root})
    .stdout()
    .command(['check', './tmp/test.html'])
    .it('runs check file', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })

  test
    .loadConfig({root})
    .stdout()
    .command(['check', './tmp/test.html', '-t'])
    .exit(1)
    .it('should be exit 1 if t flags is provided', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })
})
