import { inject, Injectable } from '@angular/core';
import { AppDataService } from "../../../shared/services/app-data/app-data.service";

@Injectable()
export class LobbyService {
  private appDataService = inject(AppDataService);

  public lobbyData = this.appDataService.appData;
}
