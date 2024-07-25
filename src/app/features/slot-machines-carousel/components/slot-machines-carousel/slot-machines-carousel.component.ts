import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { SlotInterface } from "../../../../shared/types/slot.interface";
import {
  SlotMachinesCarouselItemComponent
} from "../slot-machines-carousel-item/slot-machines-carousel-item.component";
import { NgForOf } from "@angular/common";
import { ImageButtonDirective } from "../../../../shared/directives/image-button/image-button.directive";

@Component({
  selector: 'app-slot-machines-carousel',
  standalone: true,
  imports: [
    SlotMachinesCarouselItemComponent,
    NgForOf,
    ImageButtonDirective,
  ],
  templateUrl: './slot-machines-carousel.component.html',
  styleUrl: './slot-machines-carousel.component.scss'
})
export class SlotMachinesCarouselComponent implements OnInit {
  @Input() slots: SlotInterface[] = [];

  @ViewChild('wrapperRef') wrapperRef!: ElementRef;
  @ViewChildren('slotRefs', {read: ElementRef}) slotRefs!: QueryList<ElementRef>;
  private totalScroll = 0;
  private perView = 4;

  public activeDotIndex = 0;
  public dots: number[] = [];

  ngOnInit(): void {
    this.dots = Array(Math.ceil(this.slots.length / this.perView)).fill(0);
  }

  private updateScrollPosition(): void {
    const wrapper = this.wrapperRef.nativeElement as HTMLElement;
    const firstChild = this.slotRefs.first.nativeElement as HTMLElement;
    const widthEl = firstChild.offsetWidth + parseInt(getComputedStyle(wrapper).gridGap);
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
