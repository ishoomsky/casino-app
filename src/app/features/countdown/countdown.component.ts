import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit {
  public timeRemaining: string = '01:00:00';
  private countdownDuration = 3600;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    interval(1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
      if (this.countdownDuration > 0) {
        this.countdownDuration--;
        this.updateTimeDisplay();
      } else {
        this.renewTimer();
      }
    });
  }

  private updateTimeDisplay(): void {
    const hours = Math.floor(this.countdownDuration / 3600);
    const minutes = Math.floor((this.countdownDuration % 3600) / 60);
    const seconds = this.countdownDuration % 60;

    this.timeRemaining = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');
  }

  private renewTimer(): void {
    this.countdownDuration = 3600;
    this.updateTimeDisplay();
  }
}
