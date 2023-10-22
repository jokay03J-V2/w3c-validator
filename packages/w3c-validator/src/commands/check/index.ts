import {Args, Command, Flags, ux} from '@oclif/core'
import {type CommandError} from '@oclif/core/lib/interfaces'
import chalk from 'chalk'
import {checkFile} from 'w3c-validator-wrapper'

import {displayMessage} from '../../utils/display-message.js'

export default class Check extends Command {
  static args = {
    file: Args.file({
      description: 'path to html file',
      exists: true,
      name: 'file',
      required: true,
    }),
  }

  static description = 'submit content file on W3C'

  static examples = [
    '<%= config.bin %> <%= command.id %> path/to/file.html',
    '<%= config.bin %> <%= command.id %> path/to/file.html -t',
  ]

  static flags = {
    throwError: Flags.boolean({char: 't'}),
  }

  protected async catch(err: CommandError): Promise<void> {
    this.log(chalk.red('Error >> ' + err.message))
    this.exit(1)
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(Check)
    ux.action.start('submit file')
    const messages = await checkFile(args.file)
    ux.action.stop('finished submit file')
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
