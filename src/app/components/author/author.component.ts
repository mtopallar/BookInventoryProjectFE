import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Author } from 'src/app/models/author';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { AuthorService } from 'src/app/services/author.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css'],
})
export class AuthorComponent implements OnInit {
  public classDiv1: string;
  public classDiv2: string;
  public authorList: Author[] = [];
  public author = {} as Author;
  public noAnyAuthor:boolean = false;
  public loaded:boolean = false;

  public yerliData: boolean = false;
  public yabanciData: boolean = false;
  public searchText: string = '';

  public isItAdd: boolean = true;
  public isItUpdate: boolean = false;
  public addAuthorForm: FormGroup;
  public updateAuthorForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private windowSizeService: WindowSizeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.divColSetter();
    this.getAuthors();
    this.createAddAuthorForm();
  }

  updateAuthor() {
    if (this.updateAuthorForm.valid) {
      let updateModel: Author = Object.assign({}, this.updateAuthorForm.value);
      updateModel.id = this.author.id;
      this.authorService.update(updateModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.updateAuthorForm.reset();
          this.showAddForm();
          this.getAuthors()
        },
        (errorRespone) => {
          this.toastrService.error(errorRespone.error.message,"Hata");
          //istenirse backend validasyon hataları burada ayrıca kontrol edilebilir. zaten html arayüzünde validasyon bazlı kontrol yapıldı.           
        }
      );
    }
  }

  addAuthor() {
    if (this.addAuthorForm.valid) {
      let addModel:Author = Object.assign({}, this.addAuthorForm.value)
      this.authorService.add(addModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.resetAddForm();
        this.getAuthors()
      },errorRespone=>{
        this.toastrService.error(errorRespone.error.message,"Hata")
      })
            
    }
  }

  resetAddForm() {
    //this.addAuthorForm.setValue({firstName:'',lastName:'', native:true})
    this.addAuthorForm.reset();
    this.addAuthorForm.controls['native'].setValue(true);
  }
  setCurrentAuthor(author: Author) {
    // tablodaki gri güncelle butonu
    this.author = author;
    this.createUpdateAuthorForm();
    this.showUpdateForm();
    this.scrollToTop();
  }

  createUpdateAuthorForm() {
    this.updateAuthorForm = this.formBuilder.group({
      firstName: [
        this.author.firstName,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords),
        ],
      ],
      lastName: [
        this.author.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords),
        ],
      ],
      native: [this.author.native, []],
    });
  }

  createAddAuthorForm() {
    this.addAuthorForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords),
        ],
      ],
      native: [true, []],
    });
  }

  showAddForm() {
    this.isItUpdate = false;
    this.isItAdd = true;
  }

  showUpdateForm() {
    this.isItUpdate = true;
    this.isItAdd = false;
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  yerli() {
    this.yerliData = true;
    this.yabanciData = false;
  }

  yabanci() {
    this.yabanciData = true;
    this.yerliData = false;
  }

  clearSearchArea() {
    this.searchText = '';
    this.yerliData = false;
    this.yabanciData = false;
  }

  @HostListener('window:resize', ['$event'])
  divColSetter() {
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth);
    this.classDiv1 = screenSize.class1;
    this.classDiv2 = screenSize.class2;
  }

  getAuthors() {
    this.authorService.getAll().subscribe((response) => {
      this.authorList = response.data;
      this.loaded = true;
    },responseError=>{
      this.noAnyAuthor=true;
    });
  }

  deleteAuthor(author: Author) {
    this.authorService.delete(author).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.getAuthors()
    },responseError=>{
      this.toastrService.error(responseError.error.message,"Hata")
    })
  }

  get addAuthorFirstName() {
    return this.addAuthorForm.get('firstName');
  }
  get addAuthorLastName() {
    return this.addAuthorForm.get('lastName');
  }

  get updateAuthorFirstName() {
    return this.updateAuthorForm.get('firstName');
  }
  get updateAuthorLastName() {
    return this.updateAuthorForm.get('lastName');
  }
}

// Enfes bi validasyon hatası nedir i konsola yazdıran metod.
// getFormValidationErrors() {
//   Object.keys(this.addAuthorForm.controls).forEach(key => {
//     const controlErrors: ValidationErrors = this.addAuthorForm.get(key).errors;
//     if (controlErrors != null) {
//       Object.keys(controlErrors).forEach(keyError => {
//        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
//       });
//     }
//   });
// }
