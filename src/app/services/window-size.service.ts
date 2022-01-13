import { Injectable } from '@angular/core';
import { ColByWindowSize } from '../models/colByWindowSize';

@Injectable({
  providedIn: 'root'
})
export class WindowSizeService {
  
  constructor() { 
  }

  divColDecider(currentSize:number):ColByWindowSize {
    let colByWindowSize= {} as ColByWindowSize
    if (currentSize < 1500) {
      colByWindowSize.class1 = 'col-3';
      colByWindowSize.class2 = 'col-9';
      return colByWindowSize
    } else {
      colByWindowSize.class1 = 'col-2';
      colByWindowSize.class2 = 'col-10';
      return colByWindowSize
    }
  }
}
