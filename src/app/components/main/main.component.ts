import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public getScreenWidth: any;
  //public getScreenHeight: any;
  public classDiv1: string;
  public classDiv2: string;

  ngOnInit() {
    this.getScreenWidth = window.innerWidth;
    //this.getScreenHeight = window.innerHeight;
    this.onWindowResize();
  }

  classSetter() {
    if (this.getScreenWidth < 1500) {
      this.classDiv1 = 'col-3';
      this.classDiv2 = 'col-9';
    } else {
      this.classDiv1 = 'col-2';
      this.classDiv2 = 'col-10';
    }
  }

  @HostListener('window:resize', ['$event'])  
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    //this.getScreenHeight = window.innerHeight;
    this.classSetter();
    console.log(this.getScreenWidth)
  }

}
