import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]',
})
export class BetterHighlightDirective implements OnInit {
  @Input('appBetterHighlight') defaultColor: string = 'transparent';
  @Input() highlightColor: string = 'blue';

  @HostBinding('style.backgroundColor') backgroundColor: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      'pink'
    );
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseenter') mouseOver(eventData: Event) {
    //this.renderer.setStyle(
    //  this.elementRef.nativeElement,
    //  'backgroundColor',
    //  'blue'
    //);
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
    //this.renderer.setStyle(
    //  this.elementRef.nativeElement,
    //  'backgroundColor',
    //  'transparent'
    //);
    this.backgroundColor = this.defaultColor;
  }
}
