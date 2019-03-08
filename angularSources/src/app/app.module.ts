import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { UserService } from './services/user.service';
import { AppRoutesModule } from './app.routes'
import { TokenStorageService } from './services/tokenStorageService';

import { AppComponent } from './app.component';

import { SignupComponent } from './signup/signup.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { MentorComponent } from './home/mentor/mentor.component';
import { TrainingsComponent } from './home/trainings/trainings.component';
import { AdminComponent } from './home/admin/admin.component';
import {TabMenuModule} from 'primeng/tabmenu';
import {DataTableModule} from 'primeng/datatable';
import { MentorService } from './services/mentor.service';
import { TrainingService } from './services/training.service';
import { HomeUserComponent } from './home-user/home-user.component';
import { UserDetailsComponent } from './home-user/user-details/user-details.component';
import { SearchMentorComponent } from './home-user/search-mentor/search-mentor.component';
import { UserTrainingsComponent } from './home-user/user-trainings/user-trainings.component';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/components/button/button';
import { HomeMentorComponent } from './home-mentor/home-mentor.component';
import { MentorDetailsComponent } from './home-mentor/mentor-details/mentor-details.component';
import { MentorTrainingsComponent } from './home-mentor/mentor-trainings/mentor-trainings.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ConfirmRegistrationComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    MentorComponent,
    AdminComponent,
    TrainingsComponent,
    HomeUserComponent,
    UserDetailsComponent,
    SearchMentorComponent,
    UserTrainingsComponent,
    HomeMentorComponent,
    MentorDetailsComponent,
    MentorTrainingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutesModule,
    ReactiveFormsModule,
    TabMenuModule,
    DataTableModule,
    DropdownModule,
    BrowserAnimationsModule,
    CalendarModule,
    DialogModule,
    ButtonModule
  ],
  
  providers: [
              UserService,
              TokenStorageService,
              MentorService,
              TrainingService,
              {provide: HTTP_INTERCEPTORS,   useClass: Interceptor,  multi: true,}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 
}






