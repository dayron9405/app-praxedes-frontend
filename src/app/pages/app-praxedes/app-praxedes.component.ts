import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-praxedes',
  templateUrl: './app-praxedes.component.html',
  styleUrls: ['./app-praxedes.component.scss']
})
export class AppPraxedesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openSidebar(event){
    console.log('event', event)
  }

}
