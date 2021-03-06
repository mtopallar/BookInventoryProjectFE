import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { Genre } from 'src/app/models/genre';
import { Publisher } from 'src/app/models/publisher';
import { UserBook } from 'src/app/models/userBook';
import { UserBookDto } from 'src/app/models/userBookDto';
import { UserDetailsDto } from 'src/app/models/userDetailsDto';
import { UserBookService } from 'src/app/services/user-book.service';
import { UserService } from 'src/app/services/user.service';
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
  public unReadedData:boolean = false
  public hasNote:boolean = false
  public hasNoNote:boolean = false
  public bookNameForSearch:string = "";  
  public isbnTextForSearch:string = "";  
  public publisherNameForSearch:string = "Seçiniz..."
  public authorFullNameForSearch:string = "Seçiniz...";
  public genreNameForSearch:string = "Seçiniz..."
  public nativeForSearch:boolean = false;
  public notNativeForSearch:boolean = false;

  public noAnyUserBook:boolean = false;
  public userBookDtoList:UserBookDto[] = [];
  public loaded:boolean = false;

  public authorListForSearchArea:Author[] = [];
  public noAnyAuthorForSearchArea:boolean = false;
  public genreListForSearchArea:Genre[] = [];
  public noAnyGenreForSearchArea:boolean = false;
  public publisherListForSearchArea:Publisher[] = [];
  public noAnyPublisherForSearchArea:boolean = false;

  public isItUpdate:boolean = false;
  public currentUserBookDto:UserBookDto = {} as UserBookDto;

  public authenticatedUser:UserDetailsDto = {} as UserDetailsDto;

  public updateUserBookForm:FormGroup

  constructor(
      private windowSizeService:WindowSizeService, 
      private formBuilder:FormBuilder,
      private userService:UserService, 
      private toastrService:ToastrService,
      private userBookService:UserBookService
    ) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getAuthenticatedUser()
    this.getAuthenticatedUsersBooks()
    this.getAllAuthorsInUserLibrary(this.authenticatedUser.userId)
    this.getAllGenresInUserLibrary(this.authenticatedUser.userId)
    this.getAllPublishersInUserLibrary(this.authenticatedUser.userId)
  }

  setCurrentUserBookDto(currentUserBookDto:UserBookDto){
    // gri güncelle butonu
    this.currentUserBookDto = currentUserBookDto
    this.isItUpdate = true;
    this.createUpdateUserBookForm()
    //console.log(currentUserBookDto)
  }

  cancelUpdate(){
    this.isItUpdate = false;
  }

  updateUserBook(){
    if (this.updateUserBookForm.valid) {
      let userBookEntityToUpdate:UserBook = {} as UserBook
      userBookEntityToUpdate.id = this.currentUserBookDto.id;
      userBookEntityToUpdate.bookId = this.currentUserBookDto.bookId;
      userBookEntityToUpdate.userId = this.authenticatedUser.userId;
      if (this.updateUserBookForm.get('note').value == null) {
        userBookEntityToUpdate.note = null
      }else{
        userBookEntityToUpdate.note = this.updateUserBookForm.get('note').value.trim()
      }
      userBookEntityToUpdate.readStatue = this.updateUserBookForm.get('readStatue').value

      this.userBookService.updateUserBook(userBookEntityToUpdate).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.isItUpdate = false;
        this.getAuthenticatedUsersBooks()
      },responseError=>{
        this.toastrService.error(responseError.error.message,"Hata")
      })
    }
  }

  deleteUserBook(userBookDto:UserBookDto){
    let userBookEntityToDelete:UserBook = {} as UserBook
    userBookEntityToDelete.id = userBookDto.id;
    this.userBookService.deleteUserBook(userBookEntityToDelete).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.getAuthenticatedUsersBooks()
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Hata")
    })
  }

  createUpdateUserBookForm(){
    this.updateUserBookForm = this.formBuilder.group({
      readStatue:[this.currentUserBookDto.readStatue,[]],
      note:[this.currentUserBookDto.noteDetail,[]]
    })
  }

  getAuthenticatedUser(){
    this.userService.authenticatedUserDetails.subscribe(response=>{
      this.authenticatedUser = response;
    })
  }

  getAuthenticatedUsersBooks(){
    if (this.authenticatedUser) {
      this.userBookService.getActivatedUsersAllBooks(this.authenticatedUser.userId).subscribe(response=>{
        this.userBookDtoList = response.data
        this.loaded = true;
      },responseError=>{
        this.noAnyUserBook = true
      })
    }
  }  

  getAllGenresInUserLibrary(userId:number){
    this.userBookService.getAllGenresInUserLibrary(userId).subscribe(response=>{
      let sortedList = response.data.sort((a,b) => a.name.localeCompare(b.name))
      this.genreListForSearchArea = sortedList
    },responseError=>{
      this.noAnyGenreForSearchArea = true;
    })
  }

  getAllAuthorsInUserLibrary(userId:number) {
    this.userBookService.getAllAuthorsInUsersLibrary(userId).subscribe(response=>{
      let sortedList = response.data.sort((a,b) => a.firstName.localeCompare(b.firstName))
      this.authorListForSearchArea = sortedList
    },responseError=>{
      this.noAnyAuthorForSearchArea = true;
    })
  }

  getAllPublishersInUserLibrary(userId:number){
    this.userBookService.getAllPublishersInUserLibrary(userId).subscribe(response=>{
      let sortedList = response.data.sort((a,b) => a.name.localeCompare(b.name))
      this.publisherListForSearchArea = sortedList
    },responseError=>{
      this.noAnyPublisherForSearchArea = true;
    })
  }

  numberOnly($event:any): boolean {
    const charCode = ($event.which) ? $event.which : $event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  @HostListener('window:resize', ['$event'])
  divColSetter(){
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth)
    this.classDiv1 = screenSize.class1
    this.classDiv2 = screenSize.class2
  }

  setNative(){    
    this.clear()
    this.nativeForSearch = true;
  }

  setNotNative(){    
    this.clear()
    this.notNativeForSearch = true;    
  }

  readed(){    
    this.clear()
    this.readedData = true;    
  }

  unReaded(){  
    this.clear()  
    this.unReadedData = true;
  }

  note(){    
    this.clear()
    this.hasNote = true;
  }

  noNote(){    
    this.clear()
    this.hasNoNote = true;
  }

  clear(){
    this.bookNameForSearch="";
    this.isbnTextForSearch=""
    this.readedData = false;
    this.unReadedData = false;    
    this.hasNote = false;
    this.hasNoNote = false
    this.nativeForSearch=false;
    this.notNativeForSearch=false;
    this.publisherNameForSearch = "Seçiniz..."
    this.authorFullNameForSearch = "Seçiniz..."
    this.genreNameForSearch = "Seçiniz..."    
    //this.getAuthenticatedUsersBooks()
  }

  clearWithButtons(){
    this.clear()
    this.clearRadioButtons()
  }

  clearRadioButtons(){
    let readedButton = document.getElementById('btnRadio1') as HTMLInputElement
    readedButton.checked = false;
    let notReadedButton = document.getElementById('btnRadio2') as HTMLInputElement
    notReadedButton.checked = false;
    let hasNoteButton = document.getElementById('btnRadio3') as HTMLInputElement
    hasNoteButton.checked = false;
    let hasNoNoteButton = document.getElementById('btnRadio4') as HTMLInputElement
    hasNoNoteButton.checked = false;
    let authorNativeButton = document.getElementById('btnRadio5') as HTMLInputElement
    authorNativeButton.checked = false;
    let authorNotNativeButton = document.getElementById('btnRadio6') as HTMLInputElement
    authorNotNativeButton.checked = false;
    // let clearButton = document.getElementById('btnRadio7') as HTMLFormElement
    // clearButton.reset()     
  }


}
