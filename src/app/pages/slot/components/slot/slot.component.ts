import { Component } from '@angular/core';
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";
import { DecimalPipe, NgForOf } from "@angular/common";
import { NumberAbbreviationPipe } from "../../../../shared/pipes/number-abbreviation.pipe";

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [
    AnimateNumberDirective,
    NgForOf,
    DecimalPipe,
    NumberAbbreviationPipe
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
  public totalBet = 500000000;
  public bet = 20000000;
}
