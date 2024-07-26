import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppCountdownService {
  private countdownDuration = 3600;
  private timeRemainingSubject = new BehaviorSubject<string>('01:00:00');
  public timeRemaining$ = this.timeRemainingSubject.asObservable();

  public startCountdown(): void {
    interval(1000).subscribe(() => {
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

    const formattedTime = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
    ].join(':');

    this.timeRemainingSubject.next(formattedTime);
  }

  private renewTimer(): void {
    this.countdownDuration = 3600;
    this.updateTimeDisplay();
  }
}
