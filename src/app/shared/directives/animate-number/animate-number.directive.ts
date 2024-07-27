import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[appAnimateNumber]',
  standalone: true,
  providers: [DecimalPipe]
})
export class AnimateNumberDirective implements OnChanges {
  @Input() appAnimateNumber!: number;
  @Input() duration: number = 2000;

  private startValue: number = 0;
  private currentValue: number = 0;

  constructor(private el: ElementRef, private decimalPipe: DecimalPipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appAnimateNumber']) {
      this.animateNumber();
    }
  }

  private animateNumber(): void {
    const startTime = performance.now();
    const endValue = this.appAnimateNumber;
    const duration = this.duration;

    const updateValue = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      this.currentValue = Math.floor(this.startValue + (endValue - this.startValue) * progress);
      const formattedValue = this.decimalPipe.transform(this.currentValue, '1.0-0', 'en-US');
      this.el.nativeElement.innerText = formattedValue !== null ? formattedValue : this.currentValue.toString();

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      } else {
        this.startValue = endValue;
      }
    };

    requestAnimationFrame(updateValue);
  }
}
