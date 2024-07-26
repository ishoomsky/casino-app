import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ButtonBackComponent } from "../../../../shared/components/button-back/button-back.component";

@Component({
  selector: 'app-slot-not-available',
  standalone: true,
  imports: [
    RouterLink,
    ButtonBackComponent
  ],
  templateUrl: './slot-not-available.component.html',
  styleUrl: './slot-not-available.component.scss'
})
export class SlotNotAvailableComponent {

}
