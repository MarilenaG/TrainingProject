import { Component, OnInit } from '@angular/core';
import { Mentor } from 'src/app/model/mentor';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {

  mentors: Mentor[];
  isLoadingResults = true;
  constructor( private mentorService: MentorService) { }
  ngOnInit() {
    this.displayList();
  }
  displayList() {
    this.mentorService.listMentors()
    .subscribe(res => {
      this.mentors = res;
      console.log(this.mentors);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  blockMentor(mentorId){
    console.log("mentor id : " , mentorId);
    this.mentorService.blockMentor(mentorId).subscribe(()=>this.displayList());
    
  }

  unblockMentor(mentorId){
    console.log("mentor id : " , mentorId);
    this.mentorService.unblockMentor(mentorId).subscribe(()=>this.displayList());
    
  }

}
