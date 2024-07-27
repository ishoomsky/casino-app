import { Component } from '@angular/core';
import { AnimateNumberDirective } from "../../../../shared/directives/animate-number/animate-number.directive";
import { DecimalPipe, NgForOf } from "@angular/common";
import { NumberAbbreviationPipe } from "../../../../shared/pipes/number-abbreviation.pipe";
import { SlotMachineComponent } from "../../../../features/slot-machine/components/slot-machine/slot-machine.component";
import { ImageButtonDirective } from "../../../../shared/directives/image-button/image-button.directive";
import { RouterLink } from "@angular/router";
import { ButtonBackComponent } from "../../../../shared/components/button-back/button-back.component";
import { AudioPlayerComponent } from "../../../../features/audio-player/components/audio-player/audio-player.component";
import { CountdownComponent } from "../../../../features/countdown/components/countdown.component";

@Component({
  selector: 'app-slot',
  standalone: true,
  imports: [
    AnimateNumberDirective,
    NgForOf,
    DecimalPipe,
    NumberAbbreviationPipe,
    SlotMachineComponent,
    ImageButtonDirective,
    RouterLink,
    ButtonBackComponent,
    AudioPlayerComponent,
    CountdownComponent
  ],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss'
})
export class SlotComponent {}
