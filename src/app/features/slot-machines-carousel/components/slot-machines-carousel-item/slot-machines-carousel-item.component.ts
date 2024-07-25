import { Component, Input } from '@angular/core';
import { SlotInterface } from "../../../../shared/types/slot.interface";
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";

@Component({
  selector: 'app-slot-machines-carousel-item',
  standalone: true,
  imports: [
    AnimateNumberDirective
  ],
  templateUrl: './slot-machines-carousel-item.component.html',
  styleUrl: './slot-machines-carousel-item.component.scss'
})
export class SlotMachinesCarouselItemComponent {
  @Input() slot!: SlotInterface;
}
