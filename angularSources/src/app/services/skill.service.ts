import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';
import { HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient, private router : Router) { }

  
  listSkills (): Observable<Skill[]> {
    return this.http.get<Skill[]>("training/admin/skills") ;
  }

  
  
  deleteSkill(skill): Observable<Skill> {
    return this.http.post<Skill>("training/admin/deleteSkill",skill) ;
  }

  createSkill(skill): Observable<Skill> {
    return this.http.post<Skill>("training/admin/createSkill",skill) ;
  }
  
  updateSkill(skill): Observable<Skill> {
    return this.http.post<Skill>("training/admin/updateSkill",skill) ;
  }
}
