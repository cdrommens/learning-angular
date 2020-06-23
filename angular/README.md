# Angular

## Section 1 - Getting started

create new app : `ng new <name>`

serve build : `ng serve`

when having errors :
* Go to package.json and modify `"rxjs": "^6.0.0"` to `"rxjs": "6.0.0"`
* Then run `npm update` in your project

add bootstrap : `npm install --save bootstrap@latest`
edit package.json and add in the style section: `"node_modules/bootstrap/dist/css/bootstrap.min.css"`

## Section 2 - The basics

create component : `ng generate component name` or `ng g c name``

Always decorate the class with :
```
@Component({
    selector: 'html-tag-name',    //unique
    templateUrl: '.html',
    styleUrls: ['.css]   // always array! for using file
    styles: [`           // for direct style usages
        h3 {
            color: blue;
        }
    `]
})
```
You can use this component then in the html as `<html-tag-name></html-tag-name>` (see selector).

### Selectors

There are 3 type for selectors:
* as a tag-name : see above (default)
* as an attribute : `selector: '[html-tag-name-as-attribute]'` and then in the html it should be eg `<div html-tag-name-as-attribute></div>`
* as a class : `selector: '.html-tag-name-as-class'` and then in the html it should be eg `<div class="html-tag-name-as-class"></div>`

### Databinding

4 types of databinding:
* from code to template : string interpolation: `{{ data }}`
* from code to template : property binding : `[property] = "data"`
* from template to code : event binding : `(event) = "expression"`
* both ways             : two-way-binding : `[(ngModel)] = "data"`

#### String interpolation

Between {{ }}, can be a hardcoded 'string', or a variable or a method()

#### Property binding

use [ ] to bind a variable to a property. eg the property "disabled" is binded to *variable* : `<button [disabled]="variable"/>`

#### Event binding

use ( ) to bind a javascript event to a method that needs to be executed : `<button (click)="method($event)"/>`.
$event has all the data available for that event.

#### Two-way-binding

Add FormsModule to the imports array in AppModule :
```
import { FormsModule } from '@angular/forms';
imports: [
    BrowserModule,
    FormsModule
  ],
```
You can then use in the html `[(ngModel)]="variable"`.

### Directives

Directives are own created html properties that start with * (this means  that there will be some structural changes to the DOM). 
There are also build in directives :
* ngIf : `<p *ngIf="expression">`
* ngIf with else : `<p *ngIf="expression; else <marker keyword>">`
* ngStyle to add styles : `<p [ngStyle]="{css-style-selector: method()}">`. For example `[ngStyl]="{backgroundColor: getColor()}"`
* ngClass to add classes : `[ngClass]="{css-class: expression}"`. For example `[ngClass]="{online: serverStatus === 'online'}"`