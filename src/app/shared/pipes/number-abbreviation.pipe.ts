import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberAbbreviation',
  standalone: true
})
export class NumberAbbreviationPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000) + 'B';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000) + 'M';
    } else if (value >= 1_000) {
      return (value / 1_000) + 'K';
    } else {
      return value.toString();
    }
  }
}
