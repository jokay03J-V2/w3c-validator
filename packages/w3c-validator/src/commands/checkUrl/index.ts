import {Args, Command, Flags, ux} from '@oclif/core'
import {type CommandError} from '@oclif/core/lib/interfaces'
import chalk from 'chalk'
import {checkUrl} from 'w3c-validator-wrapper'

import {displayMessage} from '../../utils/display-message.js'

export default class CheckUrl extends Command {
  static args = {
    url: Args.url({
      description: 'url to be submited on W3C',
      name: 'url',
      required: true,
    }),
  }

  static description = 'submit url on W3C'

  static examples = [
    '<%= config.bin %> <%= command.id %> https://google.com',
    '<%= config.bin %> <%= command.id %> https://exemple.com -t',
  ]

  static flags = {
    throwError: Flags.boolean({char: 't'}),
  }

  protected async catch(err: CommandError): Promise<void> {
    this.log(chalk.red('Error >> ' + err.message))
    this.exit(1)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(CheckUrl)
    ux.action.start('fetching url')
    const messages = await checkUrl(args.url.href)
    ux.action.stop('fetched url')
    displayMessage(messages)

    const errorCount = messages.filter((m) => m.type === 'error').length
    const warningCount = messages.filter((m) => m.type === 'warning').length
    const infoCount = messages.filter((m) => m.type === 'info').length

    this.log(
      chalk.red(`Found ${errorCount} error(s) `) +
        chalk.yellow(`${warningCount} warning(s) `) +
        chalk.blue(`${infoCount} info(s)`),
    )

    if (flags.throwError && errorCount > 0) {
      throw new Error('Got errors !')
    }
  }
}
