import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { Console } from 'console';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // when using click on this element: the dropdown only closes when you click on the dropdown again, so not outside of the dropdown:
  // @HostListener('click') toggleOpen() {
  // if you want that behaviour, you have to bind the click to the document
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    // check if we clicked on the button
    if (this.elementRef.nativeElement.contains(event.target)) {
      if (this.elementRef.nativeElement.classList.contains('show')) {
        this.renderer.removeClass(this.elementRef.nativeElement, 'show');
        this.renderer.removeClass(
          this.elementRef.nativeElement.childNodes[1],
          'show'
        );
      } else {
        this.renderer.addClass(this.elementRef.nativeElement, 'show');
        this.renderer.addClass(
          this.elementRef.nativeElement.childNodes[1],
          'show'
        );
      }
    } else {
      // if we didn't click on the button, close all dropdowns
      this.renderer.removeClass(this.elementRef.nativeElement, 'show');
      this.renderer.removeClass(
        this.elementRef.nativeElement.childNodes[1],
        'show'
      );
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
