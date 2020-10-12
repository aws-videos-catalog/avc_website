# avc_website

> My marvelous Nuxt.js project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

_Note: Node.js v12+ is recommended to run and build the project_

#### Generate static project

 Project can be generated statically using npm command 
 
```
npm run generate
```

In order to improve default Nuxt.js generation performance we use [nuxt-generate-cluster](https://github.com/nuxt-community/nuxt-generate-cluster) package.  
`nuxt-generate-cluster` package provides configurable multi-threaded generate command for Nuxt.js. Generation in a cluster utilizes all available CPUs and delegates portions of routes to each [Node.js worker](https://medium.com/@bobjohnson2/nodejs-worker-threads-24155706765) to maximize generation concurrency.  

Here is a list of **default** configurations in `nuxt.config.js`:  

```js
export default {
  generate: {
    workers: 4, // (optional) Number of workers to spawn. Defaults to number of CPUs
    workerConcurrency: 500, // (optional) Number of routes in a batch per worker to even the load 
    concurrency: 500 // (optional) Nuxt.js config of concurrent routes generation
  },
  // ... other Nuxt options
}
```

Check [full list](https://github.com/nuxt-community/nuxt-generate-cluster#nuxt-config-options) of options.

It is recommended to increase `generate.concurrency` option for measurable performance changes.

#### Environment variables

Project is using environment variables loaded from local `.env` file. Note, that `.env` file is added to `.gitignore` to prevent exposure of credentials in the repository. In order to setup environment variables for development and deployment create a copy of `.env.example` file with `.env` filename and make necessary changes with your credentials. 

```dotenv
# API key credential required by CLI 
# to fetch data from Youtube DATA API v3
CLI_YOUTUBE_DATA_API_KEY={YOUTUBE_API_KEY}
```

## Static database CLIs

The project includes tools to manage static content via command line.  

Available CLIs:
- `cli:videos-update` - [Videos details update CLI](cli/videos-update/README.md). Fetch and update missing information for videos
