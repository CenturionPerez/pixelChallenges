import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public literals: Literals = literals;
  public registerForm: FormGroup = new FormGroup({
    username: new FormControl('',[
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    nationality: new FormControl('',[
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    msisdn: new FormControl('', [
      Validators.minLength(9),
      Validators.maxLength(9),
      Validators.required
    ])
  });

  constructor(
    private router: Router, 
    private authService: AuthService){}

    public navigateBack(){
      this.router.navigateByUrl('auth/init');
    }

    public register(): void {
      if(this.registerForm.valid){
        this.authService.showAuthSpinner(true);
        this.authService.createUser(this.prepareRequest()).subscribe((resp) => {
          this.authService.showAuthSpinner(false);
          if(resp){
            this.router.navigateByUrl('');
            this.authService.setUserLoggedInSessionStorage(true);
            this.authService.generateSnackBar(false, literals.register_session_ok)
          }else{
            this.authService.setUserLoggedInSessionStorage(false);
            this.authService.generateSnackBar(true, literals.login_sesion_ko)
          }
        });
      }else{
        this.authService.generateSnackBar(true, literals.error_form)
      }
    }

    private prepareRequest(): User {
      return {
        name: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        nationality: (this.registerForm.get('nationality')?.value).name,
        rank: '',
        password: this.registerForm.get('password')?.value,
        score: '0',
        msisdn: this.registerForm.get('msisdn')?.value
      }
    }
}
