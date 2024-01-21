import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {
  MatDialog
} from '@angular/material/dialog';
import { PixelChallengeService } from '../../services/pixelChallenge.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public showProfile: boolean = false;
  public clickedUpdateProfile: boolean = false;
  public user: User = {
    name: '',
    email: '',
    nationality: '',
    rank: '',
    password: '',
    score: '',
    msisdn: ''
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
    this.pixelChallengeService.getUser().subscribe((resp) => {
      this.user = resp
      // this.user = {
      //   name: '',
      //   email: '',
      //   nationality: '',
      //   rank: '',
      //   password: '',
      //   score: '',
      //   msisdn: ''
      // }
      this.pixelChallengeService.showPixelChallengeSpinner(false);
      this.showProfile = true;
    });
  };
}
