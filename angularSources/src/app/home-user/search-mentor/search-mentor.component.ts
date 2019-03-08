import { Component, OnInit } from '@angular/core';
import { MentorService } from 'src/app/services/mentor.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { Mentor } from 'src/app/model/mentor';
import { Training } from 'src/app/model/training';
import { TrainingService } from 'src/app/services/training.service';
import { AppComponent } from 'src/app/app.component';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

@Component({
  selector: 'app-search-mentor',
  templateUrl: './search-mentor.component.html',
  styleUrls: ['./search-mentor.component.css']
})
export class SearchMentorComponent implements OnInit {
  searchCriteriaForm : FormGroup;
  // skillsList: Skill[];
  mentorsList:Mentor[] = [];
  skillOptionsArray: any[];
  mentorCalendars : any[];
  mentorSkills : any[];
  mentorTrainingsHistory: Training[];
  showMentorHistory = false;
  showProposeDetails=false;
  constructor(private mentorService : MentorService,  private formBuilder:FormBuilder, private skillService :SkillService,
     private trainingService:TrainingService, private tokenStorageService: TokenStorageService) {
    this.formProposeTraining = this.formBuilder.group({
      userName:  new FormControl(this.tokenStorageService.retrieveFromStorage("USER_NAME"), [Validators.required]),
      mentorName:  new FormControl('', [Validators.required]),
      skillId:  new FormControl('', [Validators.required]),
      startDate:  new FormControl('', [Validators.required]),
      endDate:  new FormControl('', [Validators.required]),
      fromTime:  new FormControl('', [Validators.required]),
      toTime:  new FormControl('', [Validators.required]),
    }); 

   }

  ngOnInit() {
    this.initSearchCriteriaForm();
    this.showMentorHistory = false;
    this.showProposeDetails=false;
  }

  initSearchCriteriaForm(){
    this.searchCriteriaForm = this.formBuilder.group({
      skillId:  new FormControl('', [Validators.required]),
      desiredDate:  new FormControl('', [Validators.required]),
      fromTime:  new FormControl('10:00', [Validators.required]),
      toTime:  new FormControl('11:00', [Validators.required]),
    }); 
    this.skillService.listSkills().subscribe (res=> {
      this.skillOptionsArray = res.map(elem => {
        return {
          value: elem.id,
          label: elem.title
        };
      });
      this.searchCriteriaForm.get("skillId").setValue(this.skillOptionsArray[0].value);
      console.log('array: ', this.skillOptionsArray);
    });
    this.mentorsList.length=0;
    this.showMentorHistory = false;
    this.showProposeDetails=false;
    this.mentorCalendars =[];
    this.mentorSkills =[];
    this.mentorTrainingsHistory=[];
  }

  searchMentorByDate(){
    console.log(this.searchCriteriaForm.value.skillId);
    console.log(this.searchCriteriaForm.value.desiredDate);
    console.log(this.searchCriteriaForm.value.fromTime);
    console.log(this.searchCriteriaForm.value.toTime);
    this.displaySearchResults();
    this.showMentorHistory=false;
    this.mentorCalendars =[];
    this.mentorSkills =[];
    this.mentorTrainingsHistory=[];
   
  }

  displaySearchResults() {
    this.mentorService.findMentorsBySkillAndDate(
                        this.searchCriteriaForm.value.skillId,
                        this.searchCriteriaForm.value.desiredDate,
                        this.searchCriteriaForm.value.fromTime,
                        this.searchCriteriaForm.value.toTime)
      .subscribe(res => {
        this.mentorsList = res;
        console.log("found mentors:" + this.mentorsList);
      }, err => {
        console.log(err);
      });
      
  }



  showMentorDetails(mentor :Mentor){
    this.mentorCalendars =mentor.calendars;
    this.mentorSkills =mentor.skils;
    this.mentorTrainingsHistory=[];
    this.trainingService.findTrainingsByMentor(mentor.userName)
      .subscribe(res => {
        this.mentorTrainingsHistory = res;
        console.log("found mentors:" + this.mentorsList);
      }, err => {
        console.log(err);
    });

    this.showMentorHistory=true;
    this.showProposeDetails=false;
  }

  formProposeTraining:FormGroup;

  showProposeTraining(mentor){
    console.log(" chosen mentor ",mentor.userName );
    console.log(" chosen skill ",this.searchCriteriaForm.value.skillId );
    this.formProposeTraining.get('userName').setValue(this.tokenStorageService.retrieveFromStorage("USER_NAME"));
    this.formProposeTraining.get('mentorName').setValue(mentor.userName);
    this.formProposeTraining.get('skillId').setValue(this.searchCriteriaForm.value.skillId);
    this.formProposeTraining.get('startDate').setValue('');
    this.formProposeTraining.get('endDate').setValue('');
    this.formProposeTraining.get('fromTime').setValue('10:00');
    this.formProposeTraining.get('toTime').setValue('11:00');
    this.showProposeDetails=true;
  }

  proposeTraining(){
    this.trainingService.proposeTraining (
      this.formProposeTraining.value.userName,
      this.formProposeTraining.value.mentorName,
      this.formProposeTraining.value.skillId,
      this.formProposeTraining.value.startDate,
      this.formProposeTraining.value.endDate,
      this.formProposeTraining.value.fromTime,
      this.formProposeTraining.value.toTime
    ).subscribe(res => {
        alert("training proposed!");
        this.showProposeDetails=false;
    }, err => {
      console.log(err);
  });
  }

  
}

