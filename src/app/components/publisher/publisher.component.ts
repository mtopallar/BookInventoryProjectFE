import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Publisher } from 'src/app/models/publisher';
import { ProjectRegexes } from 'src/app/projectValidationTools/regexes/projectRegexes';
import { PublisherService } from 'src/app/services/publisher.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-publisher',
  templateUrl: './publisher.component.html',
  styleUrls: ['./publisher.component.css']
})
export class PublisherComponent implements OnInit {

  public classDiv1:string;
  public classDiv2:string;
  public publisherList:Publisher[] = [];
  public publisher = {} as Publisher;
  public noAnyPublisher:boolean = false;
  public loaded:boolean = false;

  public searchText:string = "";
  public isItAdd:boolean = true;
  public isItUpdate:boolean = false;
  public addPublisherForm:FormGroup;
  public updatePublisherForm:FormGroup;

  constructor(
    private publisherService:PublisherService,
    private windowSizeService:WindowSizeService,
    private formBuilder:FormBuilder,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getPublishers()
    this.createAddPublisherForm()
    this.createUpdatePublisherForm()
  }

  getPublishers(){
    this.publisherService.getAll().subscribe(response=>{
      this.publisherList = response.data
      this.loaded = true;
    },responseError=>{
      this.noAnyPublisher = true
    })
  }

  createAddPublisherForm(){
    this.addPublisherForm = this.formBuilder.group({
      name:['',[Validators.required,Validators.minLength(3), Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  createUpdatePublisherForm(){
    this.updatePublisherForm = this.formBuilder.group({
      name:[this.publisher?this.publisher.name : "",[Validators.required,Validators.minLength(3),Validators.pattern(ProjectRegexes.onlyOneWhiteSpaceBetweenWords)]]
    })
  }

  setCurrentPublisher(publisher:Publisher){
    this.publisher = publisher;
    this.resetAddPublisherForm()
    this.showUpdateForm()
    this.createUpdatePublisherForm()
  }

  deletePublisher(publisher:Publisher){
    this.publisherService.delete(publisher).subscribe(response=>{
      this.toastrService.success(response.message,"Başarılı")
      this.getPublishers()
    }, errorResponse=>{
      this.toastrService.error(errorResponse.error.message,"Hata")
    })
  }

  addPublisher(){
    if (this.addPublisherForm.valid) {
      let addModel:Publisher = Object.assign({}, this.addPublisherForm.value)
      this.publisherService.add(addModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.resetAddPublisherForm();
        this.getPublishers();
        this.noAnyPublisher = false;
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message,"Hata")
      })
    }
  }

  updatePublisher(){
    if (this.updatePublisherForm.valid) {
      let updateModel:Publisher = Object.assign({}, this.updatePublisherForm.value)
      updateModel.id = this.publisher.id
      this.publisherService.update(updateModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
        this.showAddForm()
        this.updatePublisherForm.reset()
        this.getPublishers()
      },errorResponse=>{
        this.toastrService.error(errorResponse.error.message,"Hata")
      })
    }
  }

  @HostListener('window:resize', ['$event'])
  divColSetter() {
    let screenSize = this.windowSizeService.divColDeciderForGenreAndPublisher(window.innerWidth);
    this.classDiv1 = screenSize.class1;
    this.classDiv2 = screenSize.class2;
  }

  resetAddPublisherForm(){
    this.addPublisherForm.reset();
  }

  showAddForm() {
    this.updatePublisherForm.reset()
    this.isItUpdate = false;
    this.isItAdd = true;
  }

  showUpdateForm() {
    this.isItUpdate = true;
    this.isItAdd = false;
  }

  get addPublisherName(){
    return this.addPublisherForm.get("name");
  }

  get updatePublisherName(){
    return this.updatePublisherForm.get("name");
  }
}
