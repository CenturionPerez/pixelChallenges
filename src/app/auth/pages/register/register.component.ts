import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { AuthService } from '../../services/auth.service';
import { ClientRegister } from '../../interfaces/auth.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private authService: AuthService,
    private _snackbar: MatSnackBar){}

    public navigateBack(){
      this.router.navigateByUrl('auth/init');
    }

    public prepareRequest(): ClientRegister {
      return {
        name: this.registerForm.get('username')?.value,
        nationality: this.registerForm.get('nationality')?.value,
        email: this.registerForm.get('email')?.value,
        msisdn: this.registerForm.get('msisdn')?.value,
        password: this.registerForm.get('password')?.value,
      }
    }

    private generateSnackBar(error: boolean, message: string): void {
      this._snackbar.open(message, literals.accept, {
        duration: 10000,
        panelClass: error? ['snackbarKo']: ['snackbarOk']
      });
    }

    public register(): void {
      if(this.registerForm.valid){
        this.authService.showAuthSpinner(true);
        this.authService.createUser(this.prepareRequest()).subscribe((resp) => {
          this.authService.showAuthSpinner(false);
          if(resp){
            this.router.navigateByUrl('');
            this.generateSnackBar(false, literals.register_session_ok)
          }else{
            this.generateSnackBar(true, literals.login_sesion_ko)
          }
        });
      }else{
        this.generateSnackBar(true, literals.error_form)
      }
    }

}
