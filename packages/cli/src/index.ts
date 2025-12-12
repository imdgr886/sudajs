import { Command } from 'commander'
import registerPreview from './commands/theme-dev'
import registerThemeInit from './commands/theme-init'
import registerBuild from './commands/theme-build'

const program = new Command()

// Basic metadata
program.description('Sudajs cli for build theme and app').version('0.1.0')

// Register commands
const themeCommand = program.command('theme')
registerPreview(themeCommand)
registerThemeInit(themeCommand)
registerBuild(themeCommand)

// Global options (example)
program.option('-v, --verbose', 'enable verbose output')

// default/unknown command handling
program
  .showHelpAfterError()
  .configureHelp({ sortSubcommands: true, subcommandTerm: cmd => cmd.name() })
  .parse(process.argv)

// Example of reading global option (after parse)
const opts = program.opts()
if (opts.verbose) {
  // You can put global logging setup here
  // console.debug("Verbose enabled");
}
