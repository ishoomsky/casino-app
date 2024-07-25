import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-slot-not-available',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './slot-not-available.component.html',
  styleUrl: './slot-not-available.component.scss'
})
export class SlotNotAvailableComponent {

}
