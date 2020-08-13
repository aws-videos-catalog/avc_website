const fs = require('fs');

let raw  = fs.readFileSync('./static/services.json');
let services = JSON.parse(raw)

let routes = [];

const convert_name_to_link = (value)=>{
  return value.split(' ').join('_').toLowerCase()
}

for(let category in services){
  let category_url = convert_name_to_link(category)
  let category_route = '/'+category_url
  routes.push(category_route)

  for(let idx in services[category].data){
    let service_url = convert_name_to_link(services[category].data[idx].name)
    let service_route = category_route+'/'+service_url
    routes.push(service_route)
  }
}

module.exports = function get_routes(){
  return routes
}