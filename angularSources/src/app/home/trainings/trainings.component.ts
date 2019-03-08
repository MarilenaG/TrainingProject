import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {

 
  trainings: Training[];
  isLoadingResults = true;
  constructor( private trainingService: TrainingService) { }
  
  ngOnInit() {
    this.displayList();
  }

  displayList() {
    this.trainingService.listTrainings()
    .subscribe(res => {
      this.trainings = res;
      console.log(this.trainings);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
