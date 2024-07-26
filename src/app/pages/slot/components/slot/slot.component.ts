import { Component } from '@angular/core';
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [
    AnimateNumberDirective,
    NgForOf
  ],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss'
})
export class SlotComponent {
  public jackpots: {value: number}[] = [
    {
      value: 500072001387,
    },
    {
      value: 125100801942,
    },
    {
      value: 35158403052,
    },
    {
      value: 15244804717,
    },
    {
      value: 4731427500,
    }
  ];

  public numberSevenBadges =  Array(5).fill(0);

}
