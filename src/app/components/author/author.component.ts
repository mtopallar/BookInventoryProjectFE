import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  public authorList:Author[] = []
  public author = {} as Author
  public hasAdminRole:boolean = true

  constructor(private authorService:AuthorService) { }

  ngOnInit(): void {
    this.getAuthors()
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
