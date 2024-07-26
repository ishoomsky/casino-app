import { AppCountdownService } from "../services/countdown.service";
import { Observable } from "rxjs";
import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent {
  private appCountdownService = inject(AppCountdownService);
  public timeRemaining$ = this.appCountdownService.timeRemaining$;
}
