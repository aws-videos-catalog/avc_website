import dotenv from 'dotenv'
import chalk from 'chalk'

dotenv.config()

const youtubeApiKey = process.env.CLI_YOUTUBE_DATA_API_KEY

if (!youtubeApiKey) {
  console.log(chalk.bgRed('Config: CLI_YOUTUBE_DATA_API_KEY env variable is not set.'))
  process.exit(1)
}

export default {
  youtube: {
    apiKey: youtubeApiKey,
    channels: [
      'UCd6MoB9NC6uYN2grvUNT-Zg', // amazonwebservices
      'UCdoadna9HFHsxXWhafhNvKw' // AWSEventsChannel
    ]
  }
}
