import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours',
  standalone: true,
})
export class HoursPipe implements PipeTransform {

  transform(hours: number = 0, minutes: number = 0, seconds: number = 0): string {
    const formattedHours: string = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

}
