import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppDataService } from "./shared/services/app-data/app-data.service";
import { AppCountdownService } from "./features/countdown/services/countdown.service";
import { AudioPlayerService } from "./features/audio-player/services/audio-player.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private appDataService = inject(AppDataService);
  private appCountdownService = inject(AppCountdownService)
  private appAudioPlayerService = inject(AudioPlayerService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.appDataService.getStartupData();
    this.appCountdownService.startCountdown();
    this.appDataService.appData
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((appData) => {
        if (appData) {
          this.appAudioPlayerService.setSource(appData.backgroundMusic);
        }
      })
  }
}
