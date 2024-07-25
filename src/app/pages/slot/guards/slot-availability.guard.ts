import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";

export const SlotAvailabilityGuard : CanActivateFn = (route) => {
  const router = inject(Router);

  const activatedSlotId = route.params['slotId'];

  const availableSlots = [
    '1128',
  ];

  if (availableSlots.includes(activatedSlotId)) {
    return true;
  } else {
    router.navigate(['/slot-not-found', activatedSlotId]);
    return false;
  }
};
