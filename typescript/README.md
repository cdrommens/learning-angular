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

## Types

Type | Example | Description
---- | ------- | -----------
number | 1, 5.3, -10 | all number, no difference between ints and floats (float by default, 5 -> 5.0
string | "s",'s' | all text values
boolean | true, false| so no 0,1 or N,Y
object | {age: 30}| any javascript object
Array | [1,2,3]| any array
Tuple | [1,2]| fixed length and fixed type array
Enum | enum {NEW,OLD}| enums
Any | *| any kind of values, compiler doesn't check anything (avoid!)
Unknown | * | is like any, but first check the type of the value currently stored in the variable
Never | * | is like void, but it will never return a value

usage in function : function add(n1*: number*, n2*: number*) {

variables : `let variable: type`

enums: `enum Gender { MALE, FEMALE };`will have default values 0, 1
or: `enum Gender { MALE = 5, FEMALE };`will have values 5, 6
or: `enum Gender { MALE = 'M', FEMALE = 'F' };` will have values 'M' and 'F'

union types : `let variable: type1 | type2;`can have a values of type1 or type2
literal union types : `let variable: 'type1' | 'type2'`can have only value 'type1' or 'type2'
alias type : `type OwnType = number | string;`

`function name(arg1: type, ...) : type {}`
return type is always inferred automatically (so don't define it yourself unless necesarry) (can also be void)

Function type:
combinedValues can have a pointer to a function that accepts 2 number arguments and returns a number :
`let combinedValues: (a: number, b: number) => number;`

use unknown over any and just introduce an extra test (typeof)

## Misc

typeof n1 === 'number' : checks if n1 is of type number (or !==)

for loop : `for (const variable in list) {}`

convert text to number : *+*varThatHoldsNumberAsAText