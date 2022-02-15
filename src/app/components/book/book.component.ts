import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { BookDto } from 'src/app/models/bookDto';
import { Genre } from 'src/app/models/genre';
import { Publisher } from 'src/app/models/publisher';
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
  public isItAdd:boolean = true;
  public isItUpdate:boolean = false;
  public addBookForm:FormGroup;
  public updateBookForm:FormGroup;

  public authorList:Author[] = [];
  public noAnyAuthor:boolean = false;
  public genreList:Genre[] = [];
  public noAnyGenre:boolean = false;
  public publisherList:Publisher[] = [];
  public noAnyPublisher:boolean = false;

  public authorListForSearchArea: Author[] = []
  public noAnyAuthorForSearchArea:boolean = false;
  public genreListForSearchArea:Genre[] = [];
  public noAnyGenreForSearchArea:boolean = false;
  public publisherListForSearchArea:Publisher[] = [];
  public noAnyPublisherForSearchArea:boolean = false;
  public isbnTextForSearch:string;
  public bookNameForSearch:string;
  public publisherNameForSearch:string = "Seçiniz..."
  public authorFullNameForSearch:string = "Seçiniz...";
  public genreNameForSearch:string = "Seçiniz..."
  public nativeForSearch:boolean = false;
  public notNativeForSearch:boolean = false;

  public bookDtosList:BookDto[] = [];
  public noAnyBookDto:boolean = false;
  public loaded:boolean = false;

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
    this.getAllBookDtos()
    this.getAuthorsForSearchArea()
    this.getGenresForSearchArea()
    this.getPublishersForSearchArea()
  }

  getAllBookDtos(){
    this.bookandDtoService.getallBookDtos().subscribe(response=>{
      this.bookDtosList = response.data;
      this.loaded = true;
    }, responseError=>{
      this.noAnyBookDto = true;      
    })
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

  getAuthorsForSearchArea(){
    this.authorService.getAllForSearchArea().subscribe(response=>{
      let sortedList = response.data.sort((a,b)=>a.firstName.localeCompare(b.firstName))      
      this.authorListForSearchArea = sortedList
    },responseError=>{
      this.noAnyAuthorForSearchArea = true;
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

  getGenresForSearchArea(){
    this.genreService.getAllForSearchArea().subscribe(response=>{
      let sortedList = response.data.sort((a,b)=>a.name.localeCompare(b.name))
      this.genreListForSearchArea = sortedList
    },responseError=>{
      this.noAnyGenreForSearchArea = true;
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

  getPublishersForSearchArea(){
    this.publisherService.getAllForSearchArea().subscribe(response=>{
      let sortedList = response.data.sort((a,b) => a.name.localeCompare(b.name))
      this.publisherListForSearchArea = sortedList
    },responseError=>{
      this.noAnyPublisherForSearchArea = true;
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
    this.publisherNameForSearch = "Seçiniz..."
    this.authorFullNameForSearch = "Seçiniz..."
    this.genreNameForSearch = "Seçiniz..."
    this.isbnTextForSearch = ""
    this.bookNameForSearch = ""
    this.nativeForSearch = false;
    this.notNativeForSearch = false;
  }

  // update de kullan
  scrollToTop() {
    window.scroll(0, 0);
  }

  setNative(){
    this.nativeForSearch = true;
    this. notNativeForSearch = false
  }

  setNotNative(){
    this.notNativeForSearch = true;
    this.nativeForSearch = false;
  }
  

}
