export const ROUTE_TEMPLATES_VIEW_TEMPLATE = "templates/view/:templateId";

export function getRouteUrl(template, params = {}) {
  return Object.keys(params).reduce(function(template, key){
    return template.replace(`:${key}`, params[key]);
  }, template);
}