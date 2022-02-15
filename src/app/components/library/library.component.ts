import { Component, HostListener, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { Genre } from 'src/app/models/genre';
import { Publisher } from 'src/app/models/publisher';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public isbnText:string;
  public name:string;
  public publisherName:string = "Seçiniz..."
  public authorFullName:string = "Seçiniz...";
  public genreName:string = "Seçiniz..."
  public native:boolean = false;
  public notNative:boolean = false;

  public noAnyBook:boolean = false;

  public authorList:Author[] = [];
  public noAnyAuthor:boolean = false;
  public genreList:Genre[] = [];
  public noAnyGenre:boolean = false;
  public publisherList:Publisher[] = [];
  public noAnyPublisher:boolean = false;

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

  numberOnly($event:any): boolean {
    const charCode = ($event.which) ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  clearSelections(){
    this.publisherName = "Seçiniz..."
    this.authorFullName = "Seçiniz..."
    this.genreName = "Seçiniz..."
    this.isbnText = ""
    this.name = ""
    this.native = false;
    this.notNative = false;
  }

  setNative(){
    this.native = true;
    this. notNative = false
  }

  setNotNative(){
    this.notNative = true;
    this.native = false;
  }

}
