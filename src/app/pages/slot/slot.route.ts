import { Routes } from "@angular/router";
import { SlotComponent } from "./components/slot/slot.component";
import { SlotAvailabilityGuard } from "./guards/slot-availability.guard";
export const slotRoute: Routes = [
  {
    path: '',
    component: SlotComponent,
    canActivate: [SlotAvailabilityGuard]
  },
];
