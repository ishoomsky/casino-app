import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

const availableSlots = [
  '1128',
];

export const SlotAvailabilityGuard : CanActivateFn = (route) => {
  const router = inject(Router);

  const activatedSlotId = route.params['slotId'];

  if (availableSlots.includes(activatedSlotId)) {
    return true;
  } else {
    router.navigate(['/slot-not-found', activatedSlotId]);
    return false;
  }
};
