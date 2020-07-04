import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]'    // [] : use it as an attribute
})
export class BasicHighlightDirective implements OnInit{
  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
    this.elementRef.nativeElement.style.backgroundColor = 'green';
  }
}
