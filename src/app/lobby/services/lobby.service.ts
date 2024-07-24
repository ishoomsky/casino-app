import { inject, Injectable } from '@angular/core';
import { AppDataService } from "../../shared/services/app-data/app-data.service";
import { filter, map } from "rxjs";

@Injectable()
export class LobbyService {
  private appDataService = inject(AppDataService);

  public lobbyData = this.appDataService.appData;
}
