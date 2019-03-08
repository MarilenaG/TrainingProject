import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './home/user/user.component';
import { MentorComponent } from './home/mentor/mentor.component';
import { AdminComponent } from './home/admin/admin.component';
import { TrainingsComponent } from './home/trainings/trainings.component';
import { UserDetailsComponent } from './home-user/user-details/user-details.component';
import { SearchMentorComponent } from './home-user/search-mentor/search-mentor.component';
import { UserTrainingsComponent } from './home-user/user-trainings/user-trainings.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { HomeMentorComponent } from './home-mentor/home-mentor.component';
import { MentorDetailsComponent } from './home-mentor/mentor-details/mentor-details.component';
import { MentorTrainingsComponent } from './home-mentor/mentor-trainings/mentor-trainings.component';

const mainRoutes: Routes = [
  { path: 'signup',
    component: SignupComponent,
  }  ,
  { path: 'confirmRegistration',
    component: ConfirmRegistrationComponent,
  }  ,
  { path: 'login',
    component: LoginComponent,
  } ,
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'user', component: UserComponent },
      { path: 'mentor', component: MentorComponent },
      { path: 'trainings', component: TrainingsComponent },
      { path: 'admin', component: AdminComponent },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  } ,
  { path: 'home_user',
    component: HomeUserComponent,
    children: [
      { path: 'user', component: UserDetailsComponent },
      { path: 'mentors', component: SearchMentorComponent },
      { path: 'trainings', component: UserTrainingsComponent },
      { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  } ,
  { path: 'home_mentor',
    component: HomeMentorComponent,
    children: [
      { path: 'mentor', component: MentorDetailsComponent },
      { path: 'trainings', component: MentorTrainingsComponent },
      { path: '', redirectTo: 'mentor', pathMatch: 'full' }
    ]
  } 
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(mainRoutes)
  ],

  exports: [
    RouterModule
  ]
})

export class AppRoutesModule { }