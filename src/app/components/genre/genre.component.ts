import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Genre } from 'src/app/models/genre';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { GenreService } from 'src/app/services/genre.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css']
})
export class GenreComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public genreList:Genre[] = [];
  public genre = {} as Genre;
  public noAnyGenre:boolean = false;
  public loaded:boolean = false;

  public searchText:string = "";
  public isItAdd:boolean = true;
  public isItUpdate:boolean = false;
  public addGenreForm:FormGroup;
  public updateGenreForm:FormGroup

  constructor(
      private genreService:GenreService,
      private windowSizeService:WindowSizeService,
      private formBuilder:FormBuilder,
      private toastrService:ToastrService
    ) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getGenres()
    this.createAddGenreForm()
    this.createUpdateGenreForm()
  }

  getGenres(){
    this.genreService.getAll().subscribe(response=>{
      this.genreList = response.data
      this.loaded = true
    },responseError=>{
      this.noAnyGenre = true;
    })
  }

  createAddGenreForm(){
    this.addGenreForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(4), Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  createUpdateGenreForm(){
    this.updateGenreForm = this.formBuilder.group({
      name:[this.genre ? this.genre.name : "",[Validators.required,Validators.minLength(4),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  setCurrentGenre(genre:Genre){
    // gri güncelle butonu
    this.genre = genre;    
    this.resetAddGenreForm()
    this.showUpdateForm()
    this.createUpdateGenreForm()
    this.scrollToTop()
  }

  resetAddGenreForm(){
    this.addGenreForm.reset()
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  deleteGenre(genre:Genre){
    this.genreService.delete(genre).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.getGenres()
    },errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Hata")
    })
  }

  addGenre(){
    if (this.addGenreForm.valid) {
      let addModel:Genre = Object.assign({}, this.addGenreForm.value)
      this.genreService.add(addModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.resetAddGenreForm()
        this.getGenres()
        this.noAnyGenre = false;
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message,"Hata")
      })
    }
  }

  updateGenre(){
    if (this.updateGenreForm.valid) {
      let updateModel:Genre = Object.assign({}, this.updateGenreForm.value)
      updateModel.id = this.genre.id
      this.genreService.update(updateModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.showAddForm()
        this.updateGenreForm.reset()
        this.getGenres()
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message,"Hata")
      })
    }
  }

  showAddForm() {
    this.updateGenreForm.reset();
    this.isItUpdate = false;
    this.isItAdd = true;
  }

  showUpdateForm() {
    this.isItUpdate = true;
    this.isItAdd = false;
  }

  @HostListener('window:resize', ['$event'])
  divColSetter() {
    let screenSize = this.windowSizeService.divColDeciderForGenreAndPublisher(window.innerWidth);
    this.classDiv1 = screenSize.class1;
    this.classDiv2 = screenSize.class2;
  }

  get addGenreName(){
    return this.addGenreForm.get("name");
  }

  get updateGenreName(){
    return this.updateGenreForm.get("name");
  }

}
