import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  //public author = {} as Author;

  constructor() { }

  ngOnInit(): void {    
  }
  

}
