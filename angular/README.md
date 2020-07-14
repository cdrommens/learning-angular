# Angular

## Section 1 - Getting started

create new app : `ng new <name>`

serve build : `ng serve`

when having errors :
* Go to package.json and modify `"rxjs": "^6.0.0"` to `"rxjs": "6.0.0"`
* Then run `npm update` in your project

add bootstrap : `npm install --save bootstrap@latest`
edit angular.json and add in the style section: `"node_modules/bootstrap/dist/css/bootstrap.min.css"`

Since Angular 9 : `ng add @ng-bootstrap/schematics`

On Mac, fixing terminal in VSCode : add in settings.json : `"terminal.integrated.shellArgs.osx": []`

## Section 2 - The basics

create component : `ng generate component name` or `ng g c name`

Always decorate the class with :
```javascript
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
```javascript
import { FormsModule } from '@angular/forms';
imports: [
    BrowserModule,
    FormsModule
  ],
```
You can then use in the html `[(ngModel)]="variable"`.

### Directives

Directives are own created html properties. Some start with * (this means  that there will be some structural changes to the DOM). 
There are also build in directives :
* ngIf : `<p *ngIf="expression">`
* ngIf with else : `<p *ngIf="expression; else <marker keyword>">`
* ngStyle to add styles : `<p [ngStyle]="{css-style-selector: method()}">`. For example `[ngStyle]="{backgroundColor: getColor()}"`
* ngClass to add classes : `[ngClass]="{css-class: expression}"`. For example `[ngClass]="{online: serverStatus === 'online'}"`
* ngFor : `<p *ngFor="let var of array; let i = index">`: repeats p for every element *var* in the **array**. For example `<p *ngFor="let server of servers"></p>`. Keyword *index* gives you the index of the current item in the array that is used in ngFor.
* ngSwitch : `<div [ngSwitch]="value"><p *ngSwitchCase="5">Show when value is 5</p>...</div>`

## Section 5 - Components & Databinding

### Passing to custom properties (from Parent to Child)

In your child component, expose a property to the outside with `@Input()`:
```typescript
@Component()
export class ChildComponent() {
    @Input() property: {var: string};
}
```
Then in the HTML of the parentComponent : `<app-child-component [property] = "{var: 'value'}"></app-child-component>`.
You can also use aliasses : `@Input('aliasProperty') property: {var: string};`. 
Then you must use it in the HTML as `<app-child-component [aliasProperty] = "{var: 'value'}"></app-child-component>`.

### Passing to custom events (from Child To Parent)

In the child component, expose an event to the outside with data in in with `@Output()`:
```typescript
@Output() eventToHandle = new EventEmitter<{
    var: string;
  }>();
```
This is an event called *eventToHandle* with a data record in it which has field var with type string.
To send this event to the parent, use the EventEmitter in a function:
```typescript
function() {
    this.eventToHandle.emit({
        var: 'value';
    });
}
```
In the parent component, you can listen to that event with event binding:
`<app-child-component (eventToHandle)="functionToHandleEvent($event)"></app-child-component>`
The function to handle the event, could then look like this (watch the fact that eventData has the same structure as the structure in the EventEmitter in the child):
```typescript
functionToHandleEvent(eventData: {var: string}) {
    //do sth with eventData, for example : eventData.var
}
```
Also here aliasses can be used.

### View encapsulation

All styles defined in the different css files, only apply to the component itself. So you can't use a CSS class from component X in component Y.
If you want to change it, you have to add an option to the @Component:
`encapsulation: ViewEncapsulation.option``
option can consist of 3 values:
* EMULATED : default behaviour
* NONE : no encapsulation is used, this means that the styles in this component will be affected from the outside
* EMULATED : uses the shadow DOM (not supported in all browsers)

### Local References
If you don't want 2way binding, you can pass a reference with `#referenceName` of the HTML component to somewhere else in the template:
```html
<input type="text" #referenceName>
<button (click)="function(referenceName)">Do</button>
```
In the code, you can then use this reference to the HTML component:
```typescript
function(input as HTMLInputElement) {
    // do sth with input.value
}
```
So you pass a reference of the html component via parameters to a function in the template.

### Access to the template & DOM
If you want to pass a reference of the component to the typescript code, you can use a local reference `#referenceName`in combination with `@ViewChild()`:
```html
<input type="text" #referenceName>
```
In the code, you can the use this reference to the component (mark that is is a reference, not the component itself):
```typescript
@ViewChild('referenceName', {static: true}) input: ElementRef;
function() {
    // do sth with input.nativeElement.value
}
```
Add `{static: true}`if you want to access the selected element in ngOnInit().

So you pass a reference of the html to the code directly.

### Add own html content to your component with a directive
If you want to add HTML code in your own component, use `ng-content`.
So in the template of your component:
```html
<div>
    <ng-content></ng-content>
</div>
```

You can then use the component like this:
```html
<app-component>
    <h1>header</h1>
</app-component>
```
So the html between *app-component* will be placed instead of *ng-content*. Default behaviour is that Angular removes everything inside the tags of own components. You can also use _references_ in ng-content :
```html
<app-component>
    <h1 #referenceName>header</h1>
</app-component>
```
And in the code :
```typescript
@ContentChild('referenceName', {static: true}) input: ElementRef;
function() {
    // do sth with input.nativeElement.value
}
```

### Lifecycle hooks

Available hooks :
* ngOnChanges : called after a bound input property changes (@Input)
* ngOnInit : component is initialized and after the constructor (before added to the DOM)
* ngDoCheck : called during every change detection
* ngAfterContentInit : called after ng-content has been projected in the view
* ngAfterContentCheck : called after every ng-content content has been changed
* ngAfterViewInit: called after the component views (and child views) has been initialized
* ngAfterViewChecked : called every time when the view (and child views) have been checked
* ngOnDestroy : called once the component will be destroyed

To use these, always implement the corresponding interface. For example `export class MyComponent implements ngOnInit {}`

## Section 7 - Understaing directives

There are 2 types of directives :
* attribute directives : look like a normal HTML attribute ; they only change the the element they are added to ([ngClass], [ngStyle])
* structural directives : look like a normal HTML attribute but with a leading * ; they affect the whole area in the DOM (*ngIf, *ngFor)

create a new one with `ng g directive directiveName`.

Your directive could like like this then :
```typescript
@Directive({
  selector: '[appBasicHighlight]'    // [] : use it as an attribute
})
export class BasicHighlightDirective implements OnInit{
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.... // here you can do whatever you want in the renderer and you can access the element with this.elementRef.nativeElement
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'blue');
  }
}
```
The selector show how we can use the directive. If it is between [], then it means that it's an attribute directive. 
The element where the directive is used on, is injected in the constructor (private is mandatory!). 
We use the renderer to manipulate the DOM and it must also be injected in the constructor.
We can then use everything together in NgOnInit().
To check what the renderer can do, check [here](https://angular.io/api/core/Renderer2).

### Listen to host events

To capture events on the directive, use the `@HostListener('name-of-the-event') function(eventData: Event){}`.
So the argument of the @HistListener is the javascript event that you want to bind to :

```typescript
@HostListener('mouseenter') mouseOver(eventData: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'blue'
    );
  }
```

### Binding to simple properties

If you want to bind to simple properties, for example the backgroundColor, then using the renderer is a bit overkill. 
You can use `@HostBinding('name-of-the-property') propertyName: type = initial value`.
For example if you want to only change the backgroundColor:
```typescript
@HostBinding('style.backgroundColor') backgroundColor: string = 'transparent';

function() {
    this.backgroundColor = 'blue';
}
```

### Bindin to directive properties

If you want to pass data to your directive, you can use @Input() fields to pass it down :
`@Input() property: string;`
And in the HTML : `<p appMyDirective [property]="'value'">Style me with better directive!</p>`.

You can see 2 things : we have an extra property binding and the value is a string, so it should be enclosed with '', which means we have here "'value'".
To change this, we can set the alias of the @Input to the name of the directive :
`@Input('appMyDirective') property: string;`.
You can then use it in the HTML:
`<p [appMyDirective]="'value'">Style me with better directive!</p>`.

If you want to pass a string and want to loose the "''", then you must delete the []:
`<p appMyDirective="value">Style me with better directive!</p>`.

### Structural directive

For creating an own structural directive, use a setter of the same name as the directive as @Input.
Inject in the constructor the template where the directive is working on through TemplateRef and the place in the DOM through ViewContainerRef:
```typescript
@Directive({
  selector: '[appMyDirective]',
})
export class MyDirective {
  @Input() set appMyDirective(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {}
}
```
YOu can use it in the HTML :
```html
<div *appMyDirective="condition"> template to show </div>
```

## Section 9 - Services and dependency injection

Create a new service with `ng g s ServicenameService`
You can then use this service in a component, by injecting it in the constructor (private is a shortcut for a private final field):
```typescript
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers: [ServicenameService]    // used for injection
})
export class MyComponent {
  constructor(private servicenameService: ServicenameService) {}

  function() {
    this.servicenameService.doSth();
  }
}
```

Injection in angular is a hierarchical injector:
* *AppModule* : same instance of Service is available application wide
* *AppComponent* : same instance of Service is available for all components (and child components) but nog for other services
* *any other component* : same instance of Service is available for this component and child components, but not for the rest
So injection always goes down the tree, not up or sideways.

So if you specify a service in the **providers** section of @Component, this will create a new instance of the service. If you just pass it in the constructor without mentioning it in the providers, it will pass down the instance of the parent.

A service that is used in the whole application, is added in the **providers** section of the AppModule in @NgModule. 
Also needed if you want to inject a service into a sevice. You then have to add an extra decorator `@Injectable()`

In Angular 6+, there is a shorter syntax. If you want your service to be available globally, just use :
```typescript
@Injectable({providedIn: 'root'})
export class MyService { ... }
```

### Cross component communication

Component B wants to change if something happens in Component A. We can use a Service for that.
First create MyService and define an EventEmitter :
```typescript
@Injectable({
  providedIn: 'root',
})
export class MyService {
  mySelected = new EventEmitter<string>();
}
```

In Component A, when you click a button, you can emit an event on the service:
In the html : `<button (click)="do()">`.
```typescript
//inject MyService
do() {
  this.myService.mySelected.emit(//data);
}
```

In Component B, you can listen on those events by subscribing on the EventEmitter:
```typescript
//inject MyService
ngOnInit() {
    this.myService.mySelected.subscribe((data: data-type) => {
      //action to be taken
    });
  }
```