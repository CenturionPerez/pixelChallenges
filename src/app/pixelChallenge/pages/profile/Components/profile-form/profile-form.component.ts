import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { PixelChallengeService } from 'src/app/pixelChallenge/services/pixelChallenge.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { ProfileComponent } from '../../profile.component';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit {

  @Output() callGetUser: EventEmitter<boolean> = new EventEmitter<boolean>();
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
public user: User = {
  email: '',
  img: '',
  name: '',
  password: ''
}


constructor(
  private router: Router,
  private pixelChallengeService: PixelChallengeService,
  private authService: AuthService,
  private profileComponent: ProfileComponent
  ) { }

  ngOnInit(): void {
    this.openForm();
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



  private requestModifyData(): User {
    return {
      email: this.updateUserForm.get('email')?.value,
      img: this.updateUserForm.get('img')?.value,
      name: this.updateUserForm.get('username')?.value,
      password: this.updateUserForm.get('password')?.value
    };
  };

  public update(): void {
    this.pixelChallengeService.showPixelChallengeSpinner(true);
    this.pixelChallengeService.modifyUser(this.requestModifyData()).subscribe((resp) => {
      this.pixelChallengeService.showPixelChallengeSpinner(false);
      if(resp){
        this.callGetUser.emit();
        this.authService.generateSnackBar(false, literals.modify_user_ok);
        this.closeForm();
      }else{
        this.authService.generateSnackBar(true, literals.modify_user_ko);
      }
    });
  };

  public openForm(): void {
    this.showFormProfile = true;
  }

  public closeForm(): void {
    this.showFormProfile = false;
    this.showComponentProfile.emit(false);
  }

}
