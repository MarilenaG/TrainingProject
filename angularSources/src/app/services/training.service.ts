import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Training } from '../model/training';
import { Observable } from 'rxjs';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient, private router : Router) { }
  
  listTrainings (): Observable<Training[]> {
    return this.http.get<Training[]>("training/training/trainings") ;
  }

  
  
  listActiveTrainings (): Observable<Training[]> {
    return this.http.get<Training[]>("training/training/trainingsInProgress");
  }

  
  listTrainingsByUser (userName:string): Observable<Training[]> {
    return this.http.post<Training[]>("training/training/findByUser", userName);
  }

  findTrainingsByMentor (mentorName:string): Observable<Training[]> {
    return this.http.post<Training[]>("training/training/findByMentor", mentorName);
  }
  proposeTraining(userName:String, mentorName : String, skillId:number, startDate: Date, endDate:Date, fromTime:Time, toTime:Time  ) : Observable<Training> {
    const representation = 
       {userName:userName,
        mentorName : mentorName,
        skillId: skillId, 
        startDate: startDate,
        endDate: endDate, 
        fromTime:fromTime,
        toTime:toTime}    ;
    return this.http.post<Training>('training/training/proposeTraining', representation) ;
  }


  rateTraining(trainingId: number,selectedRating:number) : Observable<Training> {
    return this.http.post<Training>('training/training/rateTraining?trainingId='+ trainingId +'&rating='+ selectedRating,null);
  }
  

  updateProgressTraining(trainingId: number,selectedProgress:number) : Observable<Training> {
    return this.http.post<Training>('training/training/updateProgressTraining?trainingId='+ trainingId +'&progress='+ selectedProgress,null);
  }

  confirmTraining(trainingId: number) : Observable<Training> {
    return this.http.post<Training>('training/training/confirmTraining?trainingId='+ trainingId ,null);
  }
  finalizeTraining(trainingId: number) : Observable<Training> {
    return this.http.post<Training>('training/training/finalizeTraining?trainingId='+ trainingId ,null);
  }

  acceptTraining(trainingId: number) : Observable<Training> {
    return this.http.post<Training>('training/training/acceptTraining?trainingId='+ trainingId ,null);
  }
  payTraining(trainingId: number) : Observable<Training> {
    return this.http.post<Training>('training/training/payTraining?trainingId'+ trainingId ,null);
  }

  rejectTraining(trainingId: number, rejectComments: string) : Observable<Training> {
    return this.http.post<Training>('training/training/confirmTraining?trainingId='+ trainingId +'&rejectComments='+ rejectComments,null);
  }
}
