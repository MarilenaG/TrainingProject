import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/model/training';
import { AppComponent } from 'src/app/app.component';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

@Component({
  selector: 'app-mentor-trainings',
  templateUrl: './mentor-trainings.component.html',
  styleUrls: ['./mentor-trainings.component.css']
})
export class MentorTrainingsComponent implements OnInit {
  trainings: Training[];
  showRejectPopup=false;
  selectedMentorId:number;
  rejectForm:FormGroup;
  constructor( private trainingService: TrainingService,   private formBuilder : FormBuilder, private tokenStorageService: TokenStorageService) { 
    this.rejectForm = this.formBuilder.group({
      rejectComments : new FormControl('')
    });
  }

  ngOnInit() {
    this.displayList();
  }
  displayList() {
    this.trainingService.findTrainingsByMentor( this.tokenStorageService.retrieveFromStorage("USER_NAME"))
    .subscribe(res => {
      this.trainings = res;
      console.log(this.trainings);
    }, err => {
      console.log(err);
    });
  }

  accept(training){
    this.trainingService.acceptTraining (training.id)
      .subscribe(res => {
          alert("training accepted!");
          this.displayList();
      }, err => {
        console.log(err);
    });
  }

  rejectProposal(){
    this.trainingService.rejectTraining( this.selectedMentorId,this.rejectForm.value.rejectComments)
    .subscribe(res => {
        alert("training rejected!");
        this.showRejectPopup=false;
        this.displayList();
        
      }
    , err => {
      console.log(err);
      
    });
  }
  
  displayRejectPopup(training){
    this.selectedMentorId = training.mentorId;
    console.log("choosen mentor",this.selectedMentorId);
    this.rejectForm.get('rejectComments').setValue('');
    console.log("initial reject comments",this.rejectForm.value.rejectComments);
    this.showRejectPopup=true;
  }

}
