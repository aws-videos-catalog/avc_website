import yargs from 'yargs/yargs'

const cliOptions = yargs(process.argv.slice(2)).
  option('service', {
    alias: 's',
    type: 'sting',
    description: 'Specific service name to search'
  }).
  option('concurrency', {
    alias: 'c',
    type: 'number',
    description: 'Number of concurrent services processing. Default: 5',
    default: 5
  }).
  option('stop-limit', {
    alias: 'sl',
    type: 'number',
    description: 'Number of unmatched videos in a row to stop searching the channel. Default: 5',
    default: 10
  }).
  help('h').
  alias('h', 'help').
  alias('v', 'version').
  argv

export default cliOptions
