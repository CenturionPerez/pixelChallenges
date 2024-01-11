import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClientAuthentication } from '../../interfaces/auth.interface';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';

@Component({
  selector: 'init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})

export class InitComponent implements OnInit{

  public literals: Literals = literals;
  public initForm: FormGroup = new FormGroup({
    email: new FormControl('', [
        Validators.email,
        Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackbar: MatSnackBar){}

  ngOnInit(): void {

  }

  public navigateToRegister(){
    this.router.navigateByUrl('auth/register');
  }

  public navigateToInvitedMode() {
    this.router.navigateByUrl('playAsInvited');

   }

  public access(): void {
    if(this.initForm.valid){
      this.authService.showAuthSpinner(true);
      this.authService.verifyUser(this.prepareRequest()).subscribe((resp) => {
        this.authService.showAuthSpinner(false);
        if(resp){
          this.router.navigateByUrl('');
          this.generateSnackBar(false, literals.init_session_ok)
        }else{
          this.generateSnackBar(true, literals.login_sesion_ko)
        }
      });
    }else{
      this.generateSnackBar(true, literals.error_form)
    }
  }

  private generateSnackBar(error: boolean, message: string): void {
    this._snackbar.open(message, literals.accept, {
      duration: 10000,
      panelClass: error? ['snackbarKo']: ['snackbarOk']
    });
  }

  private prepareRequest(): ClientAuthentication {
    return {
      email: this.initForm.get('email')?.value,
      password: this.initForm.get('password')?.value
    }
  }

}
