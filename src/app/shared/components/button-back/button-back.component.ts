import { Component } from '@angular/core';
import { ImageButtonDirective } from "../../directives/image-button/image-button.directive";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-button-back',
  standalone: true,
  imports: [
    ImageButtonDirective,
    RouterLink
  ],
  templateUrl: './button-back.component.html',
  styleUrl: './button-back.component.scss'
})
export class ButtonBackComponent {

}
