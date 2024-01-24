import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { PixelChallengeService } from 'src/app/pixelChallenge/services/pixelChallenge.service';
import { AuthService } from '../../../../../auth/services/auth.service';
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
    username: new FormControl('', [
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
    name: '',
    email: '',
    nationality: '',
    rank: '',
    password: '',
    score: '',
    msisdn: ''
  }

  constructor(
    private pixelChallengeService: PixelChallengeService,
    private authService: AuthService) { }

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
    this.showComponentProfile.emit(false);
  }

  private requestModifyData(): User {
    return {
      name: this.profileForm.get('username')?.value,
      email: this.profileForm.get('email')?.value,
      nationality: '',
      rank: '',
      password: this.profileForm.get('password')?.value,
      score: '',
      msisdn: ''
      //img: this.updateUserForm.get('img')?.value
    };
  };
}
