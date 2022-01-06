import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yyyyMmDd',
})
export class YyyyMmDdPipe implements PipeTransform {
  transform(value: any): string {
    return value.toISOString().slice(0, 10);
  }
}
