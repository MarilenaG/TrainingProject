import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { ApplicationUser } from '../model/applicationUser';
import { HttpClient} from "@angular/common/http";
import { Router,NavigationExtras } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';


@Injectable()
export class UserService {
  constructor(private http: HttpClient, private router : Router) { }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  } 



  register(user: User): Observable<any> {
    return this.http.post('training/signup', user);
  }

  confirmRegistration(user: User): Observable<any> {
        return this.http.put('training/confirmRegistration?userName='+ user.userName+'&registrationCode='+ user.registrationCode,null);
  }

  login(applicationUser: ApplicationUser): Observable<any> {
    return this.http.post('training/login', applicationUser);
  }

  

  listUsers (): Observable<User[]> {
    return this.http.get<User[]>("training/user/users") ;
  }

  getUser( userId :string) : Observable<User> {
    return this.http.get<User>(`training/user/${userId}`) ;
  }
  
  blockUser(user): Observable<any> {
    return this.http.post('training/user/blockUser',user);
  }

  unblockUser(user): Observable<any> {
    return this.http.post('training/user/unblockUser', user);
  }
 
 
}