import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import {AppComponent} from 'src/app/app.component';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  userDetailForm :FormGroup;
  constructor(private formBuilder : FormBuilder, private userService: UserService, private tokenStorageService: TokenStorageService) { 
    this.userDetailForm = this.formBuilder.group({
      id : new FormControl(''),
      userName : new FormControl(''),
      password:  new FormControl(''),
      firstName:  new FormControl(''),
      lastName:  new FormControl(''),
      contact:  new FormControl(''),
      registrationCode:  new FormControl(''),
      registrationDate:  new FormControl(''),
      active:  new FormControl(''),
      userType:  new FormControl('')
    });

  }
 
  ngOnInit() {
    //todo : read this from session storage
    console.log("userId: ", this.tokenStorageService.retrieveFromStorage("USER_ID"));
    this.userService.getUser(this.tokenStorageService.retrieveFromStorage("USER_ID")).subscribe( res => {
      this.displayDetailForm(res);
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  displayDetailForm( user:User){
    this.userDetailForm.setValue(user)
  }
}
