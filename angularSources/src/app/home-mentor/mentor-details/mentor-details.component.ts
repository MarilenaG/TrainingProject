import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MentorService } from 'src/app/services/mentor.service';
import { AppComponent } from 'src/app/app.component';
import { Mentor } from 'src/app/model/mentor';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

@Component({
  selector: 'app-mentor-details',
  templateUrl: './mentor-details.component.html',
  styleUrls: ['./mentor-details.component.css']
})
export class MentorDetailsComponent implements OnInit {
  mentorDetailForm :FormGroup;
  mentorSkills : any[];
  mentorCalendars : any[];
  constructor(private formBuilder : FormBuilder, private mentorService: MentorService,private tokenStorageService: TokenStorageService) { 
    this.mentorDetailForm = this.formBuilder.group({
      id : new FormControl(''),
      userName : new FormControl(''),
      password:  new FormControl(''),
      active:  new FormControl(''),
      registrationCode:  new FormControl(''),
      registrationDate:  new FormControl(''),
      yearsExperience:  new FormControl(''),
      linkedinUrl:  new FormControl(''),
      mentorIBAN:  new FormControl(''),
      mobileNumber:  new FormControl(''),
      calendars:  new FormControl(''),
      skils:  new FormControl(''),
      userType:  new FormControl('')
    });

  }
 
  ngOnInit() {
    
    console.log("mentorId: ", this.tokenStorageService.retrieveFromStorage("USER_ID"));
    this.mentorService.getMentor( this.tokenStorageService.retrieveFromStorage("USER_ID")).subscribe( res => {
      this.displayDetailForm(res);
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  displayDetailForm( mentor:Mentor){
    this.mentorDetailForm.setValue(mentor);
    this.mentorSkills = mentor.skils;
    this.mentorCalendars = mentor.calendars;
  }
}
