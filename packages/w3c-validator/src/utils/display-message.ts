import type {responseMessage} from 'w3c-validator-wrapper'

import {ux} from '@oclif/core'
import chalk from 'chalk'

/**
 * INTERNAL display each response message
 * @param messages messages to be displayed
 * @internal
 * @private
 * @returns {void}
 */
export function displayMessage(messages: responseMessage[]): void {
  for (const message of messages) {
    switch (message.type) {
      case 'error': {
        ux.log(chalk.red(message.type), chalk.bgGray(`line: ${message.lastLine ?? 'unknow'}`), message.message)
        ux.log(chalk.bgBlack.underline(message.extract ?? 'unknow'))
        break
      }

      case 'info': {
        ux.log(chalk.blue(message.type), chalk.bgGray(`line: ${message.lastLine ?? 'unknow'}`), message.message)
        ux.log(chalk.bgBlack.underline(message.extract ?? 'unknow'))
        break
      }

      case 'warning': {
        ux.log(chalk.yellow(message.type), chalk.bgGray(`line: ${message.lastLine ?? 'unknow'}`), message.message)
        ux.log(chalk.bgBlack.underline(message.extract ?? 'unknow'))
        break
      }

      case 'fatal': {
        ux.log(chalk.magenta(message.type), chalk.bgGray(`line: ${message.lastLine ?? 'unknow'}`), message.message)
        ux.log(chalk.bgBlack.underline(message.extract ?? 'unknow'))
        break
      }

      default: {
        ux.log(chalk.grey(message.type), chalk.bgGray(`line: ${message.lastLine ?? 'unknow'}`), message.message)
        ux.log(chalk.bgBlack.underline(message.extract ?? 'unknow'))
        break
      }
    }
  }
}
