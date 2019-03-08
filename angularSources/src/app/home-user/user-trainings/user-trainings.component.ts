import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';
import { AppComponent } from 'src/app/app.component';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

@Component({
  selector: 'app-user-trainings',
  templateUrl: './user-trainings.component.html',
  styleUrls: ['./user-trainings.component.css']
})
export class UserTrainingsComponent implements OnInit {

  
  trainings: Training[];
  isLoadingResults = true;
  selectedRating:number;
  selectedTrainingId:number;
  ratings: any[];
  showRatingPopup = false;
  showProgressPopup = false;
  
  progressForm:FormGroup;
  constructor( private trainingService: TrainingService, private app:AppComponent, private formBuilder: FormBuilder, private tokenStorageService: TokenStorageService) {
    this.progressForm = this.formBuilder.group({
      selectedProgress : new FormControl('')
    });
   }
  
  ngOnInit() {
    this.displayList();
    this.selectedRating=1;
    this.ratings= [
      {value:1, label:"Poor"},
      {value:2, label:"Not good"},
      {value:3, label:"OK"},
      {value:4, label:"Good"},
      {value:5, label:"Excellent"},
    ];
    this.showRatingPopup=false;
    this.showProgressPopup=false;
  }

  saveRating(){
    this.trainingService.rateTraining( this.selectedTrainingId,this.selectedRating)
    .subscribe(res => {
        this.displayList();
        this.showRatingPopup=false;
        this.showProgressPopup=false;
        }
    , err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  rateTraining(training){
    this.selectedRating = training.rating;
    this.selectedTrainingId=training.id;
    this.showRatingPopup=true;
    this.showProgressPopup=false;
  }

  displayList() {
    this.trainingService.listTrainingsByUser(this.tokenStorageService.retrieveFromStorage("USER_NAME"))
    .subscribe(res => {
      this.trainings = res;
      console.log(this.trainings);
      this.isLoadingResults = false;
      this.showRatingPopup=false;
      this.showProgressPopup=false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  saveProgress(){
    this.trainingService.updateProgressTraining( this.selectedTrainingId,this.progressForm.value.selectedProgress)
    .subscribe(res => {
        this.displayList();
        this.showRatingPopup=false;
        this.showProgressPopup=false;
      }
    , err => {
      console.log(err);
      
    });
  }

  updateProgressTraining(training){
    this.progressForm.value.selectedProgress = training.progress;
    this.selectedTrainingId=training.id;
    console.log("selected training", this.selectedTrainingId);
    this.showProgressPopup=true;
    this.showRatingPopup=false;
  }

  finalize(training){
    this.trainingService.finalizeTraining (training.id)
      .subscribe(res => {
          console.log("training finalize!");
      }, err => {
        console.log(err);
    });
  }
  pay(training){
    this.trainingService.payTraining (training.id)
      .subscribe(res => {
          console.log("training payed!");
      }, err => {
        console.log(err);
    });
  }
}

