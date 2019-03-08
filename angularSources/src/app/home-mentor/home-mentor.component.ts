import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-home-mentor',
  templateUrl: './home-mentor.component.html',
  styleUrls: ['./home-mentor.component.css']
})
export class HomeMentorComponent implements OnInit {

  constructor() { }

  activeItem: MenuItem;
     
  mentorMenuItems: MenuItem[];

  ngOnInit() {
      this.mentorMenuItems = [
          {label: 'My details', icon: 'fa fa-fw fa-bar-chart', routerLink: ['/home_mentor/mentor']},
          {label: 'My trainings', icon: 'fa fa-fw fa-calendar', routerLink: ['/home_mentor/trainings']}
          
      ];
      this.activeItem = this.mentorMenuItems[1];
  }


}
