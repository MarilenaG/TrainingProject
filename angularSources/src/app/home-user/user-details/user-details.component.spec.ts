import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TokenStorageService } from 'src/app/services/tokenStorageService';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  var userService, tokenStorageService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      imports:[ReactiveFormsModule, FormsModule, HttpClientModule, RouterModule.forRoot([])],
      providers:[UserService, TokenStorageService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userService= TestBed.get(UserService);
    tokenStorageService= TestBed.get(TokenStorageService);
  });
  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
