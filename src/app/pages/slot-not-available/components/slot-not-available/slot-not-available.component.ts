import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonBackComponent } from "../../../../shared/components/button-back/button-back.component";
import { AudioPlayerComponent } from "../../../../features/audio-player/components/audio-player/audio-player.component";
import { CountdownComponent } from "../../../../features/countdown/components/countdown.component";

@Component({
  selector: 'app-slot-not-available',
  standalone: true,
  imports: [
    RouterLink,
    ButtonBackComponent,
    AudioPlayerComponent,
    CountdownComponent
  ],
  templateUrl: './slot-not-available.component.html',
  styleUrl: './slot-not-available.component.scss'
})
export class SlotNotAvailableComponent {

}
