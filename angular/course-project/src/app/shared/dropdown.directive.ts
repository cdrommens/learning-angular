import { Directive, HostListener, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {

  @HostListener('click') toggleOpen() {
    if (this.elementRef.nativeElement.classList.contains('show')) {
      this.renderer.removeClass(this.elementRef.nativeElement, 'show');
      this.renderer.removeClass(this.elementRef.nativeElement.childNodes[1], 'show');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'show');
      this.renderer.addClass(this.elementRef.nativeElement.childNodes[1], 'show');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
}
