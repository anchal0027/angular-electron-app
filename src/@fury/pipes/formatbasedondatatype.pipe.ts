import { CurrencyPipe, DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'datatypeformat' })
export class DataTypeFormatPipe implements PipeTransform {
    constructor(private datePipe:DatePipe,private currencyPipe:CurrencyPipe) {
    }
  transform(value: any, dataType: any,format:any) {
      if(dataType=="datetime"){
        return this.datePipe.transform(value,  'dd-MMM-yyyy hh:mm:ss');
      }
      if(dataType=="decimal"){
        if(format && format!=""){
        return this.currencyPipe.transform(value,  format);
      }
      else{
        return this.currencyPipe.transform(value);
      }
    }
      else{
          return value;
      }
  }
}