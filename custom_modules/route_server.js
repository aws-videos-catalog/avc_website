
//
//  1.  Helper function to return all the dynamic pages.
//

const fs = require('fs');

//
//  2.  Read services.json file where we create all the routes from.
//
let raw  = fs.readFileSync('./static/services.json');
let services = JSON.parse(raw)

//
//  3.  Create an empty routes array which will be populated later.
//
let routes = [];

//
//  4.  Same function that is used while creating urls for category and service
//      names.
//

const convert_name_to_link = (value)=>{
  return value.split(' ').join('_').toLowerCase()
}


//
//  5.  For every category name in services.json,
//
for(let category in services){
  //
  //  1.  Convert it to url form
  //
  let category_url = convert_name_to_link(category)
  //
  //  2.  Append this route to routes object.
  //
  let category_route = '/'+category_url
  routes.push(category_route)

  //
  //  3.  Now, iterate through each service data in category
  //
  for(let idx in services[category].data){

    //
    //  1.  Convert service name to url form  as well.
    //
    let service_url = convert_name_to_link(services[category].data[idx].name)
    
    //
    //  2. Append each of these to route as well, don't forget adding category url before it,
    //      since these routes are only accessible through category prefix.
    //
    let service_route = category_route+'/'+service_url
    routes.push(service_route)
  
  }
}

    
//
//  6.  Export the routes object with a function. 
//
module.exports = function get_routes(){
  return routes
}