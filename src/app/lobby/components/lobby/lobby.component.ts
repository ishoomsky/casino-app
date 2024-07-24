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

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './lobby.component.html',
  styleUrl: './lobby.component.scss',
  providers: [LobbyService],
})
export class LobbyComponent implements OnInit {
  private lobbyService = inject(LobbyService);
  private destroyRef = inject(DestroyRef);
  public slots: SlotInterface[] = [];

  @HostBinding('style.backgroundImage')
  backgroundImage!: string;

  ngOnInit(): void {
    this.lobbyService.lobbyData
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((lobbyData) => {
        if (lobbyData) {
          this.backgroundImage = `url(${lobbyData.backgroundImage})`;
          this.slots = lobbyData.slots;
        }
      })
  }
}
