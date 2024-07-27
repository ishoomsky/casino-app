import {
  AfterViewInit,
  Component,
  ElementRef, inject,
  Input,
  OnChanges,
  OnInit,
  QueryList, Renderer2,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { SlotInterface } from "../../../../shared/types/slot.interface";
import {
  SlotMachinesCarouselItemComponent
} from "../slot-machines-carousel-item/slot-machines-carousel-item.component";
import { NgForOf, NgStyle } from "@angular/common";
import { ImageButtonDirective } from "../../../../shared/directives/image-button/image-button.directive";

@Component({
  selector: 'app-slot-machines-carousel',
  standalone: true,
  imports: [
    SlotMachinesCarouselItemComponent,
    NgForOf,
    ImageButtonDirective,
    NgStyle,
  ],
  templateUrl: './slot-machines-carousel.component.html',
  styleUrl: './slot-machines-carousel.component.scss'
})
export class SlotMachinesCarouselComponent implements OnChanges {
  @Input() slots: SlotInterface[] = [];

  @ViewChild('wrapperRef') wrapperRef!: ElementRef;
  @ViewChildren('slotRefs', {read: ElementRef}) slotRefs!: QueryList<ElementRef>;
  private totalScroll = 0;
  private perView!: number;
  private renderer = inject(Renderer2);
  private elementRef = inject(ElementRef);

  public activeDotIndex = 0;
  public dots: number[] = [];
  public carouselMaxWidth!: number;

  ngOnChanges(): void {
    this.setupComponent();

  }

  private setupComponent() {
    const globalWidth = window.innerWidth;
    if (globalWidth < 700) {
      this.perView = 1;
      this.renderer.setStyle(this.elementRef.nativeElement, 'maxWidth', 300);
      this.carouselMaxWidth = 200;
    }
    if (globalWidth >= 700 && globalWidth <= 1000) {
      this.perView = 3;
      this.renderer.setStyle(this.elementRef.nativeElement, 'maxWidth', 500);
      this.carouselMaxWidth = 600;
    }

    if (globalWidth > 1001) {
      this.perView = 4;
      this.renderer.setStyle(this.elementRef.nativeElement, 'maxWidth', 900);
      this.carouselMaxWidth = 800;
    }


    this.dots = Array(Math.ceil(this.slots.length / this.perView)).fill(0);

  }

  private updateScrollPosition(): void {
    const wrapper = this.wrapperRef.nativeElement as HTMLElement;
    const firstChild = this.slotRefs.first.nativeElement as HTMLElement;
    const widthEl = firstChild.offsetWidth + parseInt(getComputedStyle(wrapper).gap);
    wrapper.style.left = `-${this.totalScroll * widthEl}px`;
    wrapper.style.transition = '.3s';
  }

  public scrollBack(): void {
    if (this.totalScroll > 0) {
      this.totalScroll -= this.perView;
      this.updateScrollPosition();
      this.updateActiveDotIndex();
    }
  }

  public scrollForward(): void {
    if (this.totalScroll < this.slots.length - this.perView) {
      this.totalScroll += this.perView;
      this.updateScrollPosition();
      this.updateActiveDotIndex();
    }
  }

  public onDotClick(index: number): void {
    this.totalScroll = index * this.perView;
    this.updateScrollPosition();
    this.updateActiveDotIndex();
  }

  public updateActiveDotIndex(): void {
    this.activeDotIndex = Math.floor(this.totalScroll / this.perView);
  }
}
