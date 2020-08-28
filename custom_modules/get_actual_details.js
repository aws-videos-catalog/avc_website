import services from '~/static/services.json'

//
//  This function takes 2 parameters as category url name and service url name
//  then returns actual information about category or service like name, description or img
//
export default function(category_url_name,service_url_name){

  //
  //  1.  Create empty dictionaries which will hold details of category and service.
  //

  let service_details = {};
  let category_details = {};

  //
  //  2.  Let's iterate through each key in services JSON object, thus each key here is
  //      actually a category name.
  //
  for(let key in services)
  {
      //
      //  1.  Convert category name to the way it's used in URLs with the same operation we used.
      //
      let category_link_name = key.split(' ').join('_').toLowerCase();

      //
      //  2.  If converted url name is equal to given category url name this means we have the correct
      //      category.
      //
      if(category_link_name === category_url_name)
      {
        //
        //  1.  Set details to category_details dictionary.
        //
        category_details['name'] = key;
        category_details['description'] = services[key].info.description;
        category_details['img'] = services[key].info.img
        category_details.imgPng = services[key].info.imgPng

        //
        //  2.  The reason for this if statement is that sometimes service name won't be given and
        //      only category details will be needed.
        //
        if(service_url_name){

          //
          //  1.  Apply the same procedure as before, use category name to grab service data for that specific
          //      category name.
          //
          for(let service_key in services[key].data){

            //
            //  1.  Do the same converting operation with service_name as well.
            //
            let service_link_name = services[key].data[service_key].name.split(' ').join('_').toLowerCase();

            //
            //  2.  If converted service link name equals to service url name given in parameters
            //
            if(service_link_name === service_url_name)
            {
              service_details.name = services[key].data[service_key].name
              service_details.img = services[key].data[service_key].img
              service_details.imgPng = services[key].data[service_key].imgPng
              service_details.description = services[key].data[service_key].description
            }

          }

        }
      }
  }

  return {
    service_details,
    category_details
  }
}
