import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {
  private audio: HTMLAudioElement;
  private isMutedSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private firstRunPlay = true;

  constructor() {
    this.audio = new Audio();
    this.audio.loop = true;
    this.audio.muted = true;
  }

  public setSource(sourceUrl: string): void {
    this.audio.src = sourceUrl;
    this.audio.load();
  }

  public togglePlayer(): void {
    if (this.audio.muted) {
      this.firstRunPlay && this.play();
      this.unmute();
    } else {
      this.mute();
    }
  }

  public play(): void {
    if (!this.audio.src) {
      console.warn('Audio source is not set.');
      return;
    }
    this.audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  public mute(): void {
    this.audio.muted = true;
    this.isMutedSubject$.next(true);
  }

  public unmute(): void {
    this.audio.muted = false;
    this.isMutedSubject$.next(false);
  }

  get isMuted$(): Observable<boolean> {
    return this.isMutedSubject$.asObservable();
  }

  cleanup(): void {
    this.audio.pause();
    this.audio.src = '';
    this.audio.load();
    this.isMutedSubject$.next(false);
  }
}
