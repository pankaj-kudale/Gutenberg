import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  genres = [
    {name:'Fiction', logo: ''},
    {name:'Philosophy', logo: ''},
    {name:'Drama', logo: ''},
    {name:'History', logo: ''},
    {name:'Humour', logo: ''},
    {name:'Adventure', logo: ''},
    {name:'Politics', logo: ''},
  ]
  constructor() { }

  ngOnInit() {
  }

}
