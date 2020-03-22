import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if(value.length <= maxLength){
      return value;
    } 
    return value.substr(0, maxLength) + '..'      
  }

}
