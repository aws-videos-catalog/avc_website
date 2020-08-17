const fs = require('fs')

//
//  1.  Promise based function to read the content of a directory
//
const read_directory = (dirname) => {
  return new Promise((res,rej)=>{
    //
    //  1.  Use FS module to read directory with a callback function
    //      that resolves or rejects the Promise.
    //
    fs.readdir(dirname, function(err, filenames) {
      if (err) {
        return rej(err);
      }
      return res(filenames)
    });
  })
}

//
//  1.  Main function which will open a {service_name}.json file and
//      and edit thumbnail field if a youtube url is given as the video url.
//
const fill_thumbnails = (file_name) =>{
  return new Promise(async (res,rej)=>{
    //
    //  1.  Read file using FS Module
    //
    let raw_data = fs.readFileSync(file_name)
    
    //
    //  2.  A Bytes Object is returned from readFileSync function, thus it needs to
    //      be parsed to an Object using JSON.parse()
    //
    let data = JSON.parse(raw_data)
    
    //
    //  3.  Check if a YouTube URL is given in any of the objects, if so add the thumbnail
    //      url.
    //
    let new_data = data.map((obj,idx)=>{

      //
      //  1.  Check if url includes youtube in it. That means it's a YouTube Video.
      //
      if(obj.url.includes('youtube')){

        //
        //  1.  If it does, extract the video id from it.
        //
        let video_id = obj.url.split('?v=')[1]

        //
        //  2.  Construct the thumbnail url
        //
        let thumb_url = 'https://i.ytimg.com/vi/' + video_id + '/hqdefault.jpg'

        //
        //  3.  Replace it with old value
        //
        obj['thumbnail'] = thumb_url

        //
        //  4.  Return new obj
        //
        return obj
        
      }
    })

    //
    //  4.  Overwrite the file with new version.
    //
    fs.writeFile(file_name, JSON.stringify(new_data), function (err) {
      if(err){
        return rej(err)
      }
      return res(true)
  })  
})
}


export default async ()=>{

  const dir_name = './static/services/'
  let file_names = await read_directory(dir_name)
  let promises = file_names.map((file_name,idx)=>{
    return fill_thumbnails(dir_name+file_name)
  })
  await Promise.all(promises)
  
}



