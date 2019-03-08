import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Mentors application';
  constructor (private router:Router){}

  // public userId = 2;
  // public userName ="some.user@training.application";
  // public mentorId=5;
  // public mentorName="some.mentor@gmail.com";
}
