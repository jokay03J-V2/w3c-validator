import {expect, test} from '@oclif/test'
import {dirname, join, relative} from 'path'

const root = join(import.meta.url, '../../../')
const actual = join(import.meta.url, '../test.html').replace('file:', '')

describe('check file', () => {
  test
    .loadConfig({root})
    .stdout()
    .command(['check', actual])
    .it('runs check file', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })
})

describe('check file exit code', () => {
  test
    .loadConfig({root})
    .stdout()
    .command(['check', actual, '-t'])
    .exit(1)
    .it('should be exit 1 if t flags is provided ', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })
})
