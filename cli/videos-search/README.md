## Videos search CLI

The CLI performs a search for currently not listed videos on configured channels and saves them in the DB.  

Running and options:

```
# Search all the services
npm run cli:videos-search

# Search a specific service
npm run cli:videos-search -- -s ec2

# Set number of concurrent services to search
npm run cli:videos-search -- -c 5

# Number of unmatched videos in a row to stop searching the channel.
npm run cli:videos-search -- -sl 5

# List all options
npm run cli:videos-search -- -h
```

Once script execution has been completed each service videos JSON file will be updated if any new videos found.

#### General flow of videos details update 

1) Load database of services and create an iterable list 
2) Load list of excluded videos
3) Perform a search on specific service if configured or all the services
4) Start paginated search sequence for the list of configured services
5) Lookup service keywords/name in each video's title and description until stop limit of missed lookups in a row is hit
6) Filter out matched videos against service existing video and globally excluded videos
7) Extract video details of each new video
8) Update service videos JSON with newly found videos

#### Limitations

Newly added videos for each service are missing fields due to Youtube API response limitations. Every video is missing `duration` and `tags` fields. Running Videos Update CLI is necessary to fill missing information. 

#### Exclude videos

Once service newly matched videos are found and formatted, CLI makes a check if video id is present in [excluded videos list](cli/videos-search/excluded-videos.json).  
Such list contains collection of excluded video entries in following format:

```
[
  {
    "videoId": "dQw4w9WgXcQ",
    "note": "Example of excluded video"
  }
]
``` 

The `note` field is optional and is used to keep track of potentially growing excluded videos list.
