# Angular

## Section 1 - Getting started

create new app : `ng new <name>`

serve build : `ng serve`

when having errors :
* Go to package.json and modify `"rxjs": "^6.0.0"` to `"rxjs": "6.0.0"`
* Then run `npm update` in your project

add bootstrap : `npm install --save bootstrap@latest`
edit package.json and add in the style section: `"node_modules/bootstrap/dist/css/bootstrap.min.css"`