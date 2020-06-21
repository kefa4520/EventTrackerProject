import { Pipe, PipeTransform } from '@angular/core';
import { Cycle } from '../models/cycle';

@Pipe({
  name: 'flowType'
})
export class FlowTypePipe implements PipeTransform {

  transform(cycles: Cycle[]): Cycle[] {
    const result = [];
for (let i = 0; i < cycles.length; i++) {
  if(cycles[i].volume === 'HEAVY'){
    result.push(cycles[i]);
  }

}

    return result;
  }

}
