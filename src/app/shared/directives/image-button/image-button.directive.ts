import { Directive, ElementRef, Renderer2, Input, AfterViewInit, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appImageButton]'
})
export class ImageButtonDirective implements OnChanges, AfterViewInit {
  @Input('appImageButton') imageUrl!: string;
  @Input('width') width!: string;
  @Input('height') height!: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['imageUrl'] && !simpleChanges['imageUrl'].isFirstChange()) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundImage', `url(${this.imageUrl})`);
    }
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', this.width + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', this.height + 'px');
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundImage', `url(${this.imageUrl})`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundSize', 'contain');
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundRepeat', 'no-repeat');
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundPosition', 'center');
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'transparent');
    this.renderer.setStyle(this.elementRef.nativeElement, 'border', 'none');
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }
}
