import { Component, OnInit } from '@angular/core';
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from './../../models/genre';

@Component({
  selector: 'app-searcharea',
  templateUrl: './searcharea.component.html',
  styleUrls: ['./searcharea.component.css']
})
export class SearchareaComponent implements OnInit {
  
  genres:Genre[] = []
  currentGenre:Genre=null;
  readedData:boolean = false
  unreadedData:boolean = false
  hasNote:boolean = false
  hasNoNote:boolean = false
  searchText:string;

  constructor(private genreService:GenreService) { }

  ngOnInit(): void {
    //this.getGenres();
  }

  // getGenres(){
  //   this.genreService.getGenres().subscribe(response=>{
  //     this.genres=response.data
  //   })
  // }
  // setCurrentGenre(genre:Genre){
  //   this.currentGenre = genre
  // }

  readed(){
    this.readedData = true;
    this.unreadedData = false;
    this.hasNote = false;
    this.hasNoNote = false;
    this.searchText=""
  }

  unreaded(){
    this.unreadedData = true;
    this.readedData = false;
    this.hasNote = false;
    this.hasNoNote = false;
    this.searchText=""
  }

  note(){
    this.hasNote = true;
    this.hasNoNote = false;
    this.readedData = false;
    this.unreadedData = false;
    this.searchText=""
  }

  noNote(){
    this.hasNoNote = true;
    this.hasNote = false ;
    this.readedData = false;
    this.unreadedData = false;
    this.searchText=""
  }

  clear(){
    this.searchText="";
    this.readedData = false;
    this.unreadedData = false;    
    this.hasNote = false;
    this.hasNoNote = false
  }

}
