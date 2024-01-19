import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { PixelChallengeService } from 'src/app/pixelChallenge/services/pixelChallenge.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../profile.component';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Output() callGetUser: EventEmitter<void> = new EventEmitter<void>();
  @Output() showComponentProfile: EventEmitter<boolean> = new EventEmitter<boolean>();

  public showFormProfile: boolean = false;
  public literals: Literals = literals;
  public profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(3)
    ]),
    password: new FormControl('', [
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.email,
    ]),
    img: new FormControl('',[
    ]),
  });

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

  public user: User = {
    name: '',
    email: '',
    nationality: '',
    rank: '',
    password: '',
    score: '',
    msisdn: ''
  }

  constructor(
    private router: Router,
    private pixelChallengeService: PixelChallengeService,
    private authService: AuthService,
    private profileComponent: ProfileComponent) { }

  ngOnInit(): void {
    this.openForm();
  }

  public update(): void {
    this.pixelChallengeService.showPixelChallengeSpinner(true);
    this.pixelChallengeService.modifyUser(this.requestModifyData()).subscribe((resp) => {
      this.pixelChallengeService.showPixelChallengeSpinner(false);
      if(resp){
        this.callGetUser.emit();
        this.authService.generateSnackBar(false, literals.modify_user_ok);
      }else{
        this.authService.generateSnackBar(true, literals.modify_user_ko);
      }
    });
  };

  public openForm(): void {
    this.showFormProfile = true;
  }
 
  public closeForm(): void {
    this.showComponentProfile.emit(false);
  }
  private requestModifyData(): User {
    return {
      name: this.updateUserForm.get('username')?.value,
      email: this.updateUserForm.get('email')?.value,
      nationality: '',
      rank: '',
      password: this.updateUserForm.get('password')?.value,
      score: '',
      msisdn: ''
      //img: this.updateUserForm.get('img')?.value
    };
  };
}
