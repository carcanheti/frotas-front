import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/layout/template/header/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Home',
      icon: 'home',
      routeUrl: ''
    }
  }

  ngOnInit(): void {
  }

}
