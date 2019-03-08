import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  activeItem: MenuItem;
     
  items: MenuItem[];

  ngOnInit() {
      this.items = [
          {label: 'Users', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/home/user']},
          {label: 'Mentors', icon: 'fa fa-fw fa-calendar', routerLink: ['/home/mentor']},
          {label: 'Trainings', icon: 'fa fa-fw fa-book', routerLink: ['/home/trainings']},
          {label: 'Admin', icon: 'fa fa-fw fa-support', routerLink: ['/home/admin']},
      ];
      this.activeItem = this.items[2];
  }

}
