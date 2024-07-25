import { Component, inject } from '@angular/core';
import { AudioPlayerService } from "../../services/audio-player.service";
import { AsyncPipe, NgIf } from "@angular/common";
import { ImageButtonDirective } from "../../../../shared/directives/image-button/image-button.directive";

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ImageButtonDirective
  ],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {
  public audioPlayerService = inject(AudioPlayerService);

  public isMuted$ = this.audioPlayerService.isMuted$;
}