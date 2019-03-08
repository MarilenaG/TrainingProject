import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/model/skill';
import { SkillService } from 'src/app/services/skill.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  skills: Skill[];
  isLoadingResults = true;
  showSkillDetailForm = false;
  isUpdateMode=false;
  skillDetailForm :FormGroup;
  constructor(private skillService: SkillService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.displayList();
  }

  displayList(){
    this.skillService.listSkills()
    .subscribe(res => {
      this.skills = res;
      console.log(this.skills);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  displayDetailForm( skill:Skill){
    if (skill){
      this.skillDetailForm = this.formBuilder.group({
        id : new FormControl(skill.id),
        title:  new FormControl(skill.title, [Validators.required]),
        content:  new FormControl(skill.content, [Validators.required]),
        prerequisites: new FormControl(skill.prerequisites, [Validators.required])
      });
      this.isUpdateMode=true;
    } else {
      this.skillDetailForm = this.formBuilder.group({
        id : new FormControl(''),
        title:  new FormControl('', [Validators.required]),
        content:  new FormControl('', [Validators.required]),
        prerequisites: new FormControl('', [Validators.required])
      });
      this.isUpdateMode=false;
    }
    this.showSkillDetailForm = true;
    
  }
 

  deleteSkill(skill){
    this.skillService.deleteSkill(skill).subscribe(
        ()=>{this.displayList();}
      );
  }
  
  createSkill(){
    this.skillService.createSkill(this.skillDetailForm.value).subscribe(
      ()=>{this.displayList();}
    );
  }

  updateSkill(){
    this.skillService.updateSkill(this.skillDetailForm.value).subscribe(
      ()=>{this.displayList();}
    );
  }
}

