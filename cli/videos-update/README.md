## Videos details update CLI

The CLI locates videos with incomplete information in project's static database and loads full video details from Youtube API. Every video with fields missing will receive an update with fetched details. Note that update is not partial, but whole video details will be replaced with Youtube response.

In order to run the script:

```
npm run cli:videos-update
```

Once script execution has been completed all services with updated videos are reported in console and corresponding service videos file in `static/database/categories/services/videos` is updated.

#### General flow of videos details update

- Load database of services and create an iterable list 
- Load videos list JSON for each service
- Filter out videos with incomplete details
- Load details for every incompelete video via Youtube Data API
- Overwrite video details with received details from the API
- Write service videos JSON with update videos list


#### Command line logging  

##### Errors:

- `Unable to load video details. Video is private or doesn't exist. Skipping {videoId}`

The message indicates that provided `videoId` is valid, but Youtube API has returned empty response for video public details request. This means that video is not available - removed or set to private.  
