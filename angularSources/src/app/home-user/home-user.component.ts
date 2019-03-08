
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.css']
})
export class HomeUserComponent implements OnInit {

  constructor() { }

  activeItem: MenuItem;
     
  userMenuItems: MenuItem[];

  ngOnInit() {
      this.userMenuItems = [
          {label: 'My details', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/home_user/user']},
          {label: 'Search for mentors', icon: 'fa fa-fw fa-calendar', routerLink: ['/home_user/mentors']},
          {label: 'Trainings', icon: 'fa fa-fw fa-book', routerLink: ['/home_user/trainings']},
          
      ];
      this.activeItem = this.userMenuItems[1];
  }

}
