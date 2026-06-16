import { Pipe, PipeTransform } from '@angular/core';
import { Remedio } from '../models/remedio.model';

@Pipe({ name: 'filterAtivos', standalone: true })
export class FilterAtivosPipe implements PipeTransform {
  transform(remedios: Remedio[]): number {
    return remedios.filter(r => r.ativo).length;
  }
}
