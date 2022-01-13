import { Component, HostListener, OnInit } from '@angular/core';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public classDiv1: string;
  public classDiv2: string;

  constructor(private windowSizeService:WindowSizeService) { }

  ngOnInit(): void {  
    this.divColSetter()  
  }
  
  @HostListener('window:resize', ['$event'])
  divColSetter(){
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth)
    this.classDiv1 = screenSize.class1
    this.classDiv2 = screenSize.class2
  }

}
