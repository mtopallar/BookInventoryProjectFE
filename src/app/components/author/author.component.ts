import { Component, HostListener, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';
import { WindowSizeService } from 'src/app/services/window-size.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public classDiv1: string;
  public classDiv2: string;
  public authorList:Author[] = []
  public author = {} as Author
  public hasAdminRole:boolean = true

  public yerliData:boolean = false
  public yabanciData:boolean = false  
  public searchText:string= "";

  constructor(private authorService:AuthorService, private windowSizeService:WindowSizeService) { }

  ngOnInit(): void {
    this.divColSetter()
    this.getAuthors()
  }

  yerli(){
    this.yerliData = true;
    this.yabanciData = false;    
    this.searchText=""
  }

  yabanci(){
    this.yabanciData = true;
    this.yerliData = false;    
    this.searchText=""
  }  

  clear(){
    this.searchText="";
    this.yerliData = false;
    this.yabanciData = false; 
  }

  @HostListener('window:resize', ['$event'])
  divColSetter(){
    let screenSize = this.windowSizeService.divColDecider(window.innerWidth)
    this.classDiv1 = screenSize.class1
    this.classDiv2 = screenSize.class2
  }

  getAuthors(){
    this.authorService.getAll().subscribe(response=>{
      this.authorList = response.data
    })
  }

  deleteAuthor(author:Author){
    console.log(author.id)
  }

}
