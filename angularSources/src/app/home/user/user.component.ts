import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
  
})
export class UserComponent implements OnInit {
  users: User[];
  isLoadingResults = true;
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(){
    this.userService.listUsers()
    .subscribe(res => {
      this.users = res;
      console.log(this.users);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }
  blockUser(userId){
    console.log("user id : " , userId);
    this.userService.blockUser(userId).subscribe(()=>this.displayList());
  }

  unblockUser(userId){
    console.log("user id : " , userId);
    this.userService.unblockUser(userId).subscribe(()=>this.displayList());;
    
  }

}

