import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { BookDto } from 'src/app/models/bookDto';
import { Book } from 'src/app/models/book'
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
  public currentBookDto:BookDto = {} as BookDto
  public currentBook:Book = {} as Book

  constructor(
    private windowSizeService:WindowSizeService,
    private bookandDtoService:BookAndDtoService,
    private authorService:AuthorService,
    private genreService:GenreService,
    private publisherService:PublisherService,
    private formBuilder:FormBuilder,
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
    this.createAddBookForm()
    this.createUpdateBookForm()
  }

  createAddBookForm(){
    this.addBookForm = this.formBuilder.group({
      name:["",[Validators.required,Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWordsForBookName)]],
      isbn:["",[Validators.required,Validators.pattern(ProjectRegexes.isbn)]],
      publisherName:["Seçiniz...",[]],
      authorFullName:["Seçiniz...",[]],
      genreName:["Seçiniz...",[]]
    })
  }

  createUpdateBookForm(){
    this.updateBookForm = this.formBuilder.group({
      name:[this.currentBookDto ? this.currentBookDto.name : '',[Validators.required,Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWordsForBookName)]],
      isbn:[this.currentBookDto ? this.currentBookDto.isbn : '',[Validators.required,Validators.pattern(ProjectRegexes.isbn)]],
      publisherName:[this.currentBookDto ? this.currentBookDto.publisherName : '',[]],
      authorFullName:[this.currentBookDto ? this.currentBookDto.authorFullName : '',[]],
      genreName:[this.currentBookDto ? this.currentBookDto.genreName : '',[]]
    })
  }

  addBook(){
    if (this.addBookForm.valid) {
      let convertDtoToBookEntity:Book = {} as Book;
      convertDtoToBookEntity.name = this.addBookForm.get('name').value;
      convertDtoToBookEntity.isbn = this.addBookForm.get('isbn').value;
      convertDtoToBookEntity.authorId = parseInt(this.addBookForm.get('authorFullName').value);
      convertDtoToBookEntity.genreId =  parseInt(this.addBookForm.get('genreName').value);
      convertDtoToBookEntity.publisherId = parseInt(this.addBookForm.get('publisherName').value);
      this.bookandDtoService.addBook(convertDtoToBookEntity).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.getAllBookDtos()
        this.resetAddForm()
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Hata")
      })
    }
  }  

  setCurrentBookDto(bookDto:BookDto){
    // gri güncelle butonu    
    this.currentBookDto = bookDto
    this.bookandDtoService.getBookById(bookDto.bookId).subscribe(response=>{
      this.currentBook = response.data     
      this.createUpdateBookForm()
      this.getUpdateForm()
      this.scrollToTop()
    })  
  }
  updateBook(){    
    if (this.updateBookForm.valid) {
      let bookToUpdate:Book = {} as Book
      bookToUpdate.id = this.currentBookDto.bookId;
      bookToUpdate.name = this.updateBookForm.get('name').value;
      bookToUpdate.isbn = this.updateBookForm.get('isbn').value;

     let tryParseAuthorFullNameValueToNumber:number = parseInt(this.updateBookForm.get('authorFullName').value)
     let tryParsePublisherNameValueToNumber:number = parseInt(this.updateBookForm.get('publisherName').value)
     let tryParseGenreNameValueToNumber:number = parseInt(this.updateBookForm.get('genreName').value)    

     if (Number.isNaN(tryParseAuthorFullNameValueToNumber)) {
        bookToUpdate.authorId = this.authorList.find(a=>a.id == this.currentBook.authorId).id      
     }else{
      bookToUpdate.authorId = parseInt(this.updateBookForm.get('authorFullName').value);
     }
     if (Number.isNaN(tryParsePublisherNameValueToNumber)) {
       bookToUpdate.publisherId = this.publisherList.find(p=>p.id ==  this.currentBook.publisherId).id
     }else {
      bookToUpdate.publisherId = parseInt(this.updateBookForm.get('publisherName').value); 
     }
     if (Number.isNaN(tryParseGenreNameValueToNumber)) {
       bookToUpdate.genreId = this.genreList.find(g=>g.id == this.currentBook.genreId).id
     }else{
      bookToUpdate.genreId = parseInt(this.updateBookForm.get('genreName').value);
     }
      this.bookandDtoService.updateBook(bookToUpdate).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.getAllBookDtos()
        this.resetUpdateForm()
        this.getAddForm()
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Hata")
      })
    }
  }

  resetAddForm(){
    this.addBookForm.get('name').reset()
    this.addBookForm.get('isbn').reset()
    this.addBookForm.get('authorFullName').setValue("Seçiniz...")
    this.addBookForm.get('publisherName').setValue("Seçiniz...")
    this.addBookForm.get('genreName').setValue("Seçiniz...")
  }

  resetUpdateForm(){
    this.updateBookForm.get('name').reset()
    this.updateBookForm.get('isbn').reset()
    this.updateBookForm.get('authorFullName').setValue("Seçiniz...")
    this.updateBookForm.get('publisherName').setValue("Seçiniz...")
    this.updateBookForm.get('genreName').setValue("Seçiniz...")
  }

  cancelUpdate(){
    this.resetUpdateForm()
    this.getAddForm()
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

  getAddForm(){
    this.isItAdd = true;
    this.isItUpdate = false;
  }

  getUpdateForm(){
    this.isItAdd = false;
    this.isItUpdate = true;
  }
  
  get addName(){
    return this.addBookForm.get('name');
  }

  get addIsbn(){
    return this.addBookForm.get('isbn')
  }

  get addPublisherName(){
    return this.addBookForm.get('publisherName')
  }

  get addAuthorFullName(){
    return this.addBookForm.get('authorFullName')
  }

  get addGenreName(){
    return this.addBookForm.get('genreName')
  }

  get updateName(){
    return this.updateBookForm.get('name')
  }
  get updateIsbn(){
    return this.updateBookForm.get('isbn')
  }

}
