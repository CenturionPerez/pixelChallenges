import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PixelChallengeService } from 'src/app/pixelChallenge/services/pixelChallenge.service';
import { AuthService } from '../../../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../interfaces/user.interface';
import { ProfileComponent } from '../../profile.component';
import { MatDialogClose } from '@angular/material/dialog';



@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent {
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
  ) { }

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
  this.pixelChallengeService.modifyUser(this.requestModifyData()).subscribe((resp) => {
    if(resp){
      this.authService.generateSnackBar(false, literals.modify_user_ok);
      this.pixelChallengeService.getUser('Example');
    }else{
      this.authService.generateSnackBar(true, literals.modify_user_ko);
    }
  });
};


}
