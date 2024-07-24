import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { AppDataInterface } from "../../types/app-data.interface";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {
  private httpClient = inject(HttpClient);

  public appData: BehaviorSubject<AppDataInterface | null> = new BehaviorSubject<AppDataInterface | null>(null);

  public getStartupData(): void {
    this.httpClient.get<AppDataInterface>(environment.appDataConfigUrl)
      .subscribe((appData) => {
        this.appData.next(appData);
      })
    ;
  }
}
