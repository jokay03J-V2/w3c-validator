import {expect, test} from '@oclif/test'
import {join} from 'node:path'

const root = join(import.meta.url, '../../../')

describe('check url', () => {
  test
    .loadConfig({root})
    .stdout()
    .command(['checkUrl', 'https://example.com'])
    .it('runs check url', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })

  test
    .loadConfig({root})
    .stdout()
    .command(['checkUrl', 'https://example.com', '-t'])
    .exit(1)
    .it('should be exit 1 if t flags is provided ', (ctx) => {
      expect(ctx.stdout).to.contain('error')
      expect(ctx.stdout).to.contain('info')
      expect(ctx.stdout).to.contain('warning')
    })
})
