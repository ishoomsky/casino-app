import { Component, Input } from '@angular/core';
import { SlotInterface } from "../../../../shared/types/slot.interface";
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";
import { NgClass, NgIf, NgStyle, NgTemplateOutlet } from "@angular/common";

interface BadgePosition {
  top: number;
}

@Component({
  selector: 'app-slot-machines-carousel-item',
  standalone: true,
  imports: [
    AnimateNumberDirective,
    NgIf,
    NgTemplateOutlet,
    NgClass,
    NgStyle,
  ],
  templateUrl: './slot-machines-carousel-item.component.html',
  styleUrl: './slot-machines-carousel-item.component.scss'
})
export class SlotMachinesCarouselItemComponent {
  @Input() slot!: SlotInterface;

  public jackpotBadgePositions: { [slotId: number]: BadgePosition } = {
    1145: { top: 37 },
    1148: { top: 46 },
  };
}
