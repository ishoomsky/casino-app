import {
  Component,
  DestroyRef,
  HostBinding,
  inject,
  OnInit,
} from '@angular/core';
import { NgStyle } from "@angular/common";
import { LobbyService } from "../../services/lobby.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { SlotInterface } from "../../../shared/types/slot.interface";
import {
  SlotMachinesCarouselComponent
} from "../../../features/slot-machines-carousel/components/slot-machines-carousel/slot-machines-carousel.component";
import { AudioPlayerService } from "../../../features/audio-player/services/audio-player.service";
import { AudioPlayerComponent } from "../../../features/audio-player/components/audio-player/audio-player.component";

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    NgStyle,
    SlotMachinesCarouselComponent,
    AudioPlayerComponent,
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
  providers: [LobbyService, AudioPlayerService],
})
export class LobbyComponent implements OnInit {
  private lobbyService = inject(LobbyService);
  private destroyRef = inject(DestroyRef);
  public audioPlayerService = inject(AudioPlayerService);
  public slots: SlotInterface[] = [];

  @HostBinding('style.backgroundImage')
  backgroundImage!: string;

  ngOnInit(): void {
    this.lobbyService.lobbyData
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lobbyData) => {
        if (lobbyData) {
          this.backgroundImage = `url(${lobbyData.backgroundImage})`;
          this.slots = lobbyData.slots
            .sort((slotA, slotB) => slotA.order - slotB.order);

          this.audioPlayerService.setSource(lobbyData.backgroundMusic);
        }
      });
  }
}
