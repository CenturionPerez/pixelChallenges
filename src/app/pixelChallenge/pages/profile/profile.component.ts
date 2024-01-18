import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog
} from '@angular/material/dialog';

import { ProfileFormComponent } from './Components/profile-form/profile-form.component';
import { PixelChallengeService } from '../../services/pixelChallenge.service';
import { User } from '../interfaces/user.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public showProfile: boolean = false;
  public clickedUpdateProfile: boolean = false;
  public user: User = {
    email: '',
    img: '',
    name: '',
    password: ''
  }

  public updateUserForm: FormGroup = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    img: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private router: Router,
    private pixelChallengeService: PixelChallengeService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUser();
  }


  // public update(): void {
  //   this.pixelChallengeService.modifyUser(this.requestModifyData()).subscribe((resp) => {
  //     if(resp){
  //       this.authService.generateSnackBar(false, literals.modify_user_ok);
  //       this.getUser();
  //     }else{
  //       this.authService.generateSnackBar(true, literals.modify_user_ko);
  //     }
  //   });
  // };

  public updateProfileComponent(value: boolean): void {
    if(value){
      this.clickedUpdateProfile = true;
    }else{
      this.clickedUpdateProfile = false;
    }
  }

  public getUser(): void {
    this.showProfile = false;
    this.pixelChallengeService.showPixelChallengeSpinner(true);
    this.pixelChallengeService.getUser('example').subscribe((resp) => {
      // this.user = resp
      this.user = {
        email: 'Prueba@gmail.commm',
        img: 'example',
        name: 'Prueba Gmail',
        password: 'defergt54tt'
      }
      this.pixelChallengeService.showPixelChallengeSpinner(false);
      this.showProfile = true;
    });
  };

  private requestModifyData(): User {
    return {
      email: this.updateUserForm.get('email')?.value,
      img: this.updateUserForm.get('img')?.value,
      name: this.updateUserForm.get('username')?.value,
      password: this.updateUserForm.get('password')?.value
    };
  };


}
