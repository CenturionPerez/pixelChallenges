import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit{ 

  public errorInitForm: boolean = false;
  public initForm: FormGroup = this.fb.group({
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
    private fb: FormBuilder,
    private _snackbar: MatSnackBar){}

  ngOnInit(): void {

  }

  public navigateToRegister(){
    this.router.navigateByUrl('/register');
  }

  public navigateToInvitedMode() { }

  public access(): void {
    if(this.initForm.valid){
      this.errorInitForm = false;
      const request = {
        email: this.initForm.get('email')?.value,
        password: this.initForm.get('password')?.value
      }
      this.authService.showAuthSpinner(true);
      this.authService.verifyUser(request).subscribe((resp) => {
        this.authService.showAuthSpinner(false);
        if(resp){
          this.router.navigateByUrl('/init');
          this.generateSnackBar(false, 'Inicio de sesión completado')
        }else{
          this.router.navigateByUrl('/404');
          this.generateSnackBar(true, 'Por favor, compruebe los campos del formulario')
        }
      });
    }else{
      this.errorInitForm = true;
      this.generateSnackBar(true, 'Por favor, compruebe los campos del formulario')
    }
  }

  private generateSnackBar(error: boolean, message: string): void {
    this._snackbar.open(message, 'Aceptar', {
      duration: 200000,
      panelClass: error? ['snackbarOk']: ['snackbarKo']
    });
  }

  public prepareRequest(): void {}

}