export function getRouteUrl(template, params = {}) {
  return Object.keys(params).reduce(function(template, key){
    return template.replace(`:${key}`, params[key]);
  }, template);
}