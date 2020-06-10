# TypeScript

## Visual Studo code

plugins : ESLint en Material Icon Theme, Path intellisense, Prettier (shift alt f)

### Create a lite dev server for auto reloading

In terminal VS Code : `npm init`
a package.json is genereated . Then : `npm install --save-dev lite-server` (project dependant)
THen in pacakge.json add :
````json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server"
  },
````
Start the lite server : `npm start`

## Core Types

Type | Example | Description
---- | ------- | -----------
number | 1, 5.3, -10 | all number, no difference between ints and floats (float by default, 5 -> 5.0
string | "s",'s' | all text values
boolean | true, false| so no 0,1 or N,Y

usage in function : function add(n1*: number*, n2*: number*) {

typeof n1 === 'number' : checks if n1 is of type number (or !==)