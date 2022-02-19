import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { BookDto } from 'src/app/models/bookDto';
import { Genre } from 'src/app/models/genre';
import { LoginModel } from 'src/app/models/loginModel';
import { Publisher } from 'src/app/models/publisher';
import { AuthorService } from 'src/app/services/author.service';
import { BookAndDtoService } from 'src/app/services/book-and-dto.service';
import { GenreService } from 'src/app/services/genre.service';
import { PublisherService } from 'src/app/services/publisher.service';
import { UserService } from 'src/app/services/user.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public isbnTextForSearch:string;
  public bookNameForSearch:string;
  public publisherNameForSearch:string = "Seçiniz..."
  public authorFullNameForSearch:string = "Seçiniz...";
  public genreNameForSearch:string = "Seçiniz..."
  public nativeForSearch:boolean = false;
  public notNativeForSearch:boolean = false;

  public noAnyBookDto:boolean = false;
  public bookDtosList:BookDto[] = [];
  public loaded:boolean = false;

  public authorListForSearchArea:Author[] = [];
  public noAnyAuthorForSearchArea:boolean = false;
  public genreListForSearchArea:Genre[] = [];
  public noAnyGenreForSearchArea:boolean = false;
  public publisherListForSearchArea:Publisher[] = [];
  public noAnyPublisherForSearchArea:boolean = false;

  public addToLibraryForm:FormGroup;
  public currentBookDto:BookDto = {} as BookDto
  public isItAdd:boolean = false;
  

  constructor(
      private windowSizeService:WindowSizeService,
      private bookAndDtoService:BookAndDtoService,
      private authorService:AuthorService,
      private genreService:GenreService,
      private publisherService:PublisherService,
      private formBuilder:FormBuilder,
      private toastrService:ToastrService,
      private userService:UserService
    ) { }

  ngOnInit(): void {  
    this.divColSetter()
    this.getAllBookDtos()
    this.getAuthorsForSearchArea()
    this.getGenresForSearchArea()
    this.getPublishersForSearchArea() 
    this.createAddToLibraryForm() 
  }

  setCurrentBookDto(currentDto:BookDto){
    // gri ekle butonu
    this.currentBookDto = currentDto
    this.isItAdd = true;
    this.addToLibraryForm.get('readStatue').setValue(false)
    this.scrollToTop()
  }

  test(){    
    this.userService.userDetails.subscribe(response=>{
      console.log(response)
    })
  }

  cancelAdding(){
    this.isItAdd = false
  }

  createAddToLibraryForm(){
    this.addToLibraryForm = this.formBuilder.group({
      readStatue:[false,[]],
      note:['',[]]
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

  getGenresForSearchArea(){
    this.genreService.getAllForSearchArea().subscribe(response=>{
      let sortedList = response.data.sort((a,b)=>a.name.localeCompare(b.name))
      this.genreListForSearchArea = sortedList
    },responseError=>{
      this.noAnyGenreForSearchArea = true;
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

  getAllBookDtos(){
    this.bookAndDtoService.getallBookDtos().subscribe(response=>{
      this.bookDtosList = response.data;
      this.loaded = true;
    }, responseError=>{
      this.noAnyBookDto = true;      
    })
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
    this.publisherNameForSearch = "Seçiniz..."
    this.authorFullNameForSearch = "Seçiniz..."
    this.genreNameForSearch = "Seçiniz..."
    this.isbnTextForSearch = ""
    this.bookNameForSearch = ""
    this.nativeForSearch = false;
    this.notNativeForSearch = false;
  }

  setNative(){
    this.nativeForSearch = true;
    this. notNativeForSearch = false
  }

  setNotNative(){
    this.notNativeForSearch = true;
    this.nativeForSearch = false;
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

}
