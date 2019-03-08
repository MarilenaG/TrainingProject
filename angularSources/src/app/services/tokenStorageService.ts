import { Injectable } from "@angular/core";
import { Mentor } from '../model/mentor';


@Injectable()
export class TokenStorageService {


    setLoginUserDetails(user: any) {
        localStorage.setItem('ROLE', "ROLE_"+ user.userType);
        localStorage.setItem('USER_NAME', user.userName);
        localStorage.setItem('USER_ID', user.id);
        localStorage.setItem('JWT_TOKEN',  user.jwtHeader );
    }

    retrieveFromStorage(key:string){
        return localStorage.getItem(key);
    }

    
}