import { Component, HostListener, OnInit } from '@angular/core';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-userlibrary',
  templateUrl: './userlibrary.component.html',
  styleUrls: ['./userlibrary.component.css']
})
export class UserlibraryComponent implements OnInit {

  public classDiv1: string;
  public classDiv2: string;
  public readedData:boolean = false
  public unreadedData:boolean = false
  public hasNote:boolean = false
  public hasNoNote:boolean = false
  public searchText:string= "";

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

  readed(){
    this.readedData = true;
    this.unreadedData = false;
    this.hasNote = false;
    this.hasNoNote = false;
    this.searchText=""
  }

  unreaded(){
    this.unreadedData = true;
    this.readedData = false;
    this.hasNote = false;
    this.hasNoNote = false;
    this.searchText=""
  }

  note(){
    this.hasNote = true;
    this.hasNoNote = false;
    this.readedData = false;
    this.unreadedData = false;
    this.searchText=""
  }

  noNote(){
    this.hasNoNote = true;
    this.hasNote = false ;
    this.readedData = false;
    this.unreadedData = false;
    this.searchText=""
  }

  clear(){
    this.searchText="";
    this.readedData = false;
    this.unreadedData = false;    
    this.hasNote = false;
    this.hasNoNote = false
  }
}
