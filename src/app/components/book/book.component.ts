import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { Genre } from 'src/app/models/genre';
import { Publisher } from 'src/app/models/publisher';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { AuthorService } from 'src/app/services/author.service';
import { BookAndDtoService } from 'src/app/services/book-and-dto.service';
import { GenreService } from 'src/app/services/genre.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public isbnText:string;
  public name:string;
  public publisherName:string = "Seçiniz..."
  public authorFullName:string = "Seçiniz...";
  public genreName:string = "Seçiniz..."
  public native:boolean = false;
  public notNative:boolean = false;

  public isItAdd:boolean = true;
  public isItUpdate:boolean = false;
  public noAnyBook:boolean = false;
  public addBookForm:FormGroup;
  public updateBookForm:FormGroup;

  public authorList:Author[] = [];
  public noAnyAuthor:boolean = false;
  public genreList:Genre[] = [];
  public noAnyGenre:boolean = false;
  public publisherList:Publisher[] = [];
  public noAnyPublisher:boolean = false;

  constructor(
    private windowSizeService:WindowSizeService,
    private bookandDtoService:BookAndDtoService,
    private authorService:AuthorService,
    private genreService:GenreService,
    private publisherService:PublisherService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getAuthors()
    this.getGenres()
    this.getPublishers()
  }

  getAuthors(){
    this.authorService.getAll().subscribe(response=>{
      let sortedList = response.data.sort((a,b)=>a.firstName.localeCompare(b.firstName))
      this.authorList = sortedList
    },responseError=>{
      this.noAnyAuthor = true;
      //div oluşturup hata mesajı yaz.
    })
  }

  getGenres(){
    this.genreService.getAll().subscribe(response=>{
      let sortedList = response.data.sort((a,b)=>a.name.localeCompare(b.name))
      this.genreList = sortedList
    },responseError=>{
      this.noAnyGenre = true
      //div oluşturup içine hata yaz
    })
  }

  getPublishers(){
    this.publisherService.getAll().subscribe(response=>{
      let sortedList = response.data.sort((a,b) => a.name.localeCompare(b.name))
      this.publisherList = sortedList
    },responseError=>{
      this.noAnyPublisher = true
      // div yaz içine hata mesajını koy
    })
  }

  @HostListener('window:resize', ['$event'])
  divColSetter() {
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth);
    this.classDiv1 = screenSize.class1;
    this.classDiv2 = screenSize.class2;
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

  // update de kullan
  scrollToTop() {
    window.scroll(0, 0);
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
