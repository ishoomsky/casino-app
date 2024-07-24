import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppDataService } from "./shared/services/app-data/app-data.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private appDataService = inject(AppDataService)
  ngOnInit(): void {
    this.appDataService.getStartupData();
  }
}
