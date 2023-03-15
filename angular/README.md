# Angular

See https://angular-training-guide.rangle.io/

## Section 1 - Getting started

create new app : `ng new <name>`

serve build : `ng serve`

when having errors :
* Go to package.json and modify `"rxjs": "^6.0.0"` to `"rxjs": "6.0.0"`
* Then run `npm update` in your project

Otherwise, remove node_modules and package-lock.json, and run `npm install` to redownload all dependencies.

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

## Section 11 - Routing

### Global
Setting routes in angular can be done by adding them in AppModule:
```typescript
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'segment', component: MyComponent },
  ...
];
@NgModule({
  ...
  imports: [BrowserModule, FormsModule, RouterModule.forRoot(appRoutes)],
  ...
})
```
So each part of the **path** will be appended in the url (for example localhost:4200/segment) and the corresponding Component will be loaded.
You have to tell in the HTML of AppModule where to load the component by defining `<router-outlet></router-outlet>`.

If you have more then 2 or 3 routes, you can also add it a seperate **app-routing.module.ts** file.

### Navigating

You can navigate to the different routes by adding the directive **routerLink** to the HTML : `<a routerLink="/segment">Link</a>`.
Never link directly to the different segment with href, because this will cause your applicaton to reload!
Also don't forget the leading /, otherwise Angular will treat this as a relative path and thus append the current path to the route you specified in routerLink. (./ and ../ are also supported).
To set a link as active (so assigning a class) for the route we are on, just add `routerLinkActive="css-class"`to the link. This will analyse the url you are in to and if the routerLink is matched with the url, the class will be assigned.
Mark that for / this is always true, because / is always in the URL. To bypass this, you can add an option : `[routerlinkActiveOptions]="{exact: true}"`.
The class will then only be assigned if the routerLink is exactly the same as the URL.

### Navigating programmaticaly

We can do this by injecting the Router service and calling navigate on it. As arguments you provide an array of url segments :
```typescript
constructor(private router: Router) {}

function() {
  this.router.navigate(['/segment1','segment2',...]); // will go to /segment1/segment2/...
}
```
Remark that navigate() doesn't know on which route you are (unlike routerLink), so if you use relative paths or not, it's still the same.
If you want to know this, you have to inject ActivatedRoute and pass it as a paramter in navigate:
```typescript
constructor(private router: Router, private route: ActivatedRoute) {}

function() {
  this.router.navigate(['/segment'], {relativeTo: this.route});
}
```

### Passing parameters to routes

You can specify a part in your route as a parameter by preceding it with `:`:
`{ path: 'segment/:param', component: MyComponent },` where **param** is the parameter.
You can then use those parameter by injected ActivatedRoute :
```typescript
constructor(private route: ActivatedRoute) {}

ngOnInit() {
  this.route.snapshot.params['param'];
}
```
Using the snapshot is only permitted in the initialisation, because angular will only rerender the component the first time you enter the component. So if you go to another URL on the same segment with a different value in the param, angular will not update the component. Therefor you have to use an observable to update the things you want :
```typescript
ngOnInit() {
  this.route.snapshot.params['param']; // initializing value
  this.route.params.subscribe((params: Params) => { // do sth every time the value changes
        // do sth with params['param] or params.param
      });
}
```
So only use observable if you know that the component will change when you are already on the component. If your component always changes by navigating to it from other components, you don't need to use observables and your fine with snapshot.

> Since this is a built-in observable, there is no need to clean this observable. You do have to clean it up when you implement your own observables

### Passing query parameters

You can pass query parameters (?param=value) and fragment (#fragment) like this :
`[queryParams]="{param: 'value'}" fragment="fragment"`.

Programmatically you can do this in the navigate as an option:
`this.router.navigate(['/segment'], {queryParams: {param: value}, fragment: 'fragment'});`. 

This will navigate to : /segment?param=value#fragment

You can then again use it in the snapshot (snapshot.queryParams or snapshot.fragment) or as an observable.
Remeber, if you get params programatically, it wil always be a **string**. So if you want it to be for example a number, you have to precede it with + :
`const id: number = +this.route.snapshot.params['param'];`

If you want to navigate to another link while preserving the query parameters (so if you are at /segment?param=value and you want to go to /segment2?param=value), you need to add another option : `{queryParamsHandling: 'merge'}`. This will merge all the query parameters from the url you are coming from to the url you are going too. **preserve** is another option.

### Nested routes

You can also use nested routes to group routes together with the extra **children** array:

```typescript
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'segment', component: MyComponent,
    children: [
      { path: 'segment2', component: MyComponent2} , // will give /segment/segment2
      { path: ':param', component: MyComponent3} , // will give /segment/<param>
      ...
    ] },
  ...
];
```
Don't forget to add a `<router-outlet></router-outlet>`to the HTML of the parent route so that the child templates can be loaded.

### Redirecting and wildcards

To redirect to a 404 page when an url is not found, you need to add a wildcard route :
```typescript
{path: 'not-found', component: PageNotFoundComponent},
{path: '**', redirectTo: '/not-found'}  // should be the last one!
```
Remark: angular mathes paths by prefix, so /segment will match / and segment. If you only want to match the whole /segment, you need to add the option `pathMatch: 'full'` in your path segment.

### Guards

Guards is a piece of logic that is executed everytime a route is accessed.

First create a service that implements **CanActivate** :
```typescript
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // implement your authentication logic
  }
}
```

THen add this guard to every route you want with the option **canActivate** :
`{ path: 'segment', canActivate: [AuthGuard], component: MyComponent}`

If you want to only secure the child routes and not the parent, you have to implement an extra interface **CanActivateChild** in the guard, and in the rout use **canActivateChild**.

### Keeping the user from accidentily navigating away

Create a new interface :
```typescript
export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
```

Next create a new service that implements **CanDeactivate** with as parameter the new interface :
```typescript
@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {

  constructor() { }

  canDeactivate(component: CanComponentDeactivate,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return component.canDeactivate();
  }
}
```
In the route you want to check add `canDeactivate: [CanDeactivateGuard]`.

Every component that needs to be checked, now needs to implement the interface **CanComponentDeactivate** and implement the logic for checking :
```typescript
export class MyComponent implements OnInit, CanComponentDeactivate {
  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if ( // data has changed) {
      return confirm('Do you want to discard the changes?');
    } else {
      return true;
    }
  }
}
```

### Passing static data to a route

You can pass static data to a route by adding the **data** attribute in your path:
`{path: 'segment', component: MyComponent, data: {param: 'value'}}`.

You can then access this in your component by using the snapshot or subscribe : `this.route.snapshot.data['param'];`.

### Passing dynamic data to a route

If you want the data to load before the route is displayed, use a resolver (for example fetch data from backend).
A resolver first load data that the component needs and then will render the component (alternative is to first render the component and then fetch the data in the onInit method).

So first create a resolver service that implement **Resolve** (MyObject is the data that is fetched and returned):
```typescript
export class MyObjectResolver implements Resolve<MyObject> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MyObject | Observable<MyObject> | Promise<MyObject> {
    // return MyObject data fetched from the backend through a service
  }
}
```
Next add this resolved to the route through **resolve**: `{ path: ':id', component: MyComponent, resolve: { param: MyObjectResolver} }`.

When the route is loaded, the Resolver is called and the data that resolve executes, will be returned and stored in the variable **param** and passed in the **data** param of the route to the component, where you can use it:
```typescript
ngOnInit() {
    this.route.data.subscribe(
      (data: Data) => {
        // do sth with data['param'] or data.param
      }
    );
  }
```

## Section 13 - Observables

### Predefinied observables

You can use predefinied observables from the rxJs package, like for example `interval`. This will emit every x ms an incrementing number:
```typescript
interval(1000).subscribe(count => {
      console.log(count);
    });
```

> Even if you navigate away from the page with the observable, it will keep emitting! There is no automatic cleanup. Even worse, if you navigate back to the page with the observable, a new observable will be emitted, which will cause memory looks in te end.

To solve this, store the observable in a variable and call unsubscribe:
```typescript
private firstObservableSubscription: Subscription;

ngOnInit(): void {
  this.firstObservableSubscription = interval(1000).subscribe((count) => {
    console.log(count);
  });
}

ngOnDestroy(): void {
  this.firstObservableSubscription.unsubscribe();
}
```

### Building a custom observable

We want to create our own observable that mimics the interval observer. You can do this by creating a new `Observable`object with an observer as param.
The body of the observer tells the observable what to do. You have 3 methods for sending data :
* next(param) : emits param
* error(param) : stops the observable and emits error data
* complete() : tells the observable that the stream is finished:
* 
```typescript
const customObservable = new Observable((observer) => {
      setInterval(() => {
        //logic
        observer.next(data);
        if (stream is completed) {
          observer.complete();
        }
        if (error situation) {
          observer.error('There is an error');
        }
      }, 1000);
    });
```
You can use these 3 situations when you subscribe to the observable :
```typescript
this.customObservableSubscription = customObservable.subscribe(data => {
      // logic for handling the received data
    }, error => {
        // logic for handling the error
    }, () => {
        // logic for handling the completion
    });
```

### Operators

You can also manipulate the data like Java Streams way. To do this, you have to import functions from the `rxjs/operators`package.
Then on the obervable you call the `pipe()`method with as arguments as many functions that you want, like `map`, `filter`, etc:
```typescript
import { map, filter } from 'rxjs/operators';

myObservable.pipe( map( data => { return data + 1}), filter( data => return data === 2), ...)
            .subscribe(...);
```

For more see [learnrxjs.io](https://www.learnrxjs.io).

### Subjects

Subjects can be used to replace the use of an EventEmitter to pass events between components.

So the EventEmitter approach:
```typescript
// Service that holds the EventEmitter
export class Service {
  emitter = new EventEmitter<boolean>();
}
// Component that emits the event
export class SendingComponent {
  onActivate() {
    this.service.emitter.emit(data);
  }
}
// Component that receives the event
export class ReceivingComponent {
  ngOnInit(): void {
    this.service.emitter.subscribe(data => {
      // do sth with data
    })
  }
}
```

We can replace EventEmitter with `Subject`from rxjs library:
```typescript
// Service that holds the EventEmitter
export class Service {
  emitter = new Subject<boolean>();
}
// Component that emits the event
export class SendingComponent {
  onActivate() {
    this.service.emitter.next(data);
  }
}
// Component that receives the event
export class ReceivingComponent {
  private activatedSub: Subscription;

  ngOnInit(): void {
    this.activatedSub = this.service.emitter.subscribe(data => {
      // do sth with data
    })
  }
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
```

> If you have a **passive** eventsource (for example an http call), you use an Observable with `next()`inside of the body. If you have an **active** eventsource (for example an emitter), you call `next()`outside of the body. It can be triggered by the application.
> Use Subject for cross-component communication; use EventEmitter if you use `@Output`.

## Section 15 - Forms

There are 2 ways angular handles forms:
* template driven
* reactiva

### Template driven

### No binding

First make sure to use the `FormsModule` of angular in app.module.ts:
```typescript
import { FormsModule } from '@angular/forms';
imports: [
    FormsModule
  ],
```

This will cause Angular creating a Form object when he encounters `<form></form>` in the HTML. 
To tell Angular which inputs he has to manage, just add `ngModel` as an attribute and give it a name:
```html
<input type="text" id="username" class="form-control" ngModel name="username"/>
```
To be able to submit this form, add the event `ngSubmit` onto the form with a method that must be called in your code and a reference to the form data:
```html
<form (ngSubmit)="onSubmit(f)" #f="ngForm">
```

In your code :
```typescript
onSubmit(form: NgForm) {}
```

Instead of passing the reference, you can also make use of `@ViewChild`:
```html
<form (ngSubmit)="onSubmit()" #f="ngForm">
```

In your code:
```typescript
@ViewChild('f') myForm: NgForm;

onSubmit() { //do sth with this.myForm 
}
```
### One way binding 
 
To set a default value, you can use `ngModel` with **one-way binding** :
```html
<select id="secret" class="form-control" [ngModel]="defaultQuestion" name="secret">
  <option value="pet">Your first pet?</option>
  <option value="teacher">Your first teacher?</option>
</select>
```
where defaultQuestion is one of the values of the options.

### Two way binding

To simultanous show the value in another field, you can use `ngModel` with **two-way binding** :
```html
<textarea name="questionAnswer" rows="3" class="form-control" [(ngModel)]="answer"></textarea>
 <p>Your reply: {{ answer}}</p>
```

### Validating

Built-in HTML validators as keyword in the HTML tag (eg `<input type="text" required />`):
* required
* email
* checkboxrequired
* minlength
* maxlength
* pattern
  
There is a valid value on each level (form and control) that indicates if the form is valid or not.
For example to disable the submit button if the form is not valid:
```html
<button class="btn btn-primary"
        type="submit"
        [disabled]="!f.valid">Submit</button>
```

When a form or element is invalid, Angular automatically give it the class `ng-invalid`. So you can give your own style to it:
```css
input.ng-invalid.ng-touched {
  border: 1px solid red;
}
```
The `ng-touched` is to only give the style to it when the user has clicked on the element.

To show error messages, you can add a local reference to `ngModel` of this element:
```html
<input type="email" id="email" class="form-control" ngModel name="email" required email #email="ngModel" />
<span class="form-text text-muted" *ngIf="!email.valid && email.touched">Please enter a valid email!</span>
```

### Grouping controls

All of the above mechanisms can be applied to groups of controls, by wrapping them in a div with `ngModelGroup` :
```html
<div id="user-data" ngModelGroup="userData" #userData="ngModelGroup">
  <input type="text" ...>
  <input type="text" ...>
</div>
<p *ngIf="!userData.valid && userData.touched"> User Data is invalid!</p>
```

### Programmatically set the values of the form

You can use `setValue` for that:
```typescript
this.myForm.setValue({
  userData: {
    username: suggestedName,
    email: ''
  },
  secret: 'pet',
  questionAnswer: '',
  gender: 'male'
});
```
> Note: you have to pass the entire form and all values will be overwritten!

If you only want to change 1 or more values, without setting the rest, use `patchValue()`:
```typescript
this.signupForm.form.patchValue({
  userData: {
    username: suggestedName
  }
});
```

### Using the values of the form

In your code, define an object with the fields of your form, that you fill in on submit :
```typescript
myFormObject = {
  field1: '',
  field2: ''
};

onSubmit() {
  this.myFormObject.field1 = this.myForm.field1;
  this.myFormObject.field2 = this.myForm.field2;
}
```
and in the template:
```html
<input type="button" (click)="onSubmit()">
<p>Field1 : {{ myFormObject.field1 }}</p>
<p>Field2 : {{ myFormObject.field2 }}</p>
```

> If you use grouped fields (with ngModelGroup), don't forget to mention this :
> `this.myForm.myGroupedElements.field`

To clear the complete form, use `reset()` : `this.signupForm.reset();`
