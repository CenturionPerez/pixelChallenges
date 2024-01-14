import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { RegisterComponent } from 'src/app/auth/pages/register/register.component';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateClient } from 'src/app/auth/interfaces/auth.interface';
import { ClientRegister } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

 public datosRegistro: ClientRegister | null = null;
 public literals: Literals = literals;
 public updateProfileForm: FormGroup = new FormGroup({
  username: new FormControl('',[
    Validators.minLength(3)
  ]),
  email: new FormControl('', [
    Validators.email
  ]),
  password: new FormControl('', [

  ]),
  msisdn: new FormControl('', [
    Validators.minLength(9),
    Validators.maxLength(9)
  ])
 });

 ngOnInit(): void {

    const usuariosRegistro = localStorage.getItem('usuariosRegistro');

    if(usuariosRegistro){

      this.datosRegistro = JSON.parse(usuariosRegistro);

      console.log(this.datosRegistro);
      this.updateProfileForm.setValue({
        username: this.datosRegistro!.name,
        email: this.datosRegistro!.email,
        msisdn: this.datosRegistro!.msisdn
      })
    } else {
        console.error ('No se encontraron datos de registro en localStorage.');
      }
  }

  borrarDatos():void {
    localStorage.removeItem('datosRegistro');

    this.datosRegistro = null;

  }


 constructor(

  private authService: AuthService,
  private _snackbar: MatSnackBar,
  private router: Router  ){}

  public prepareRequest(): UpdateClient {
    return {
      name: this.updateProfileForm.get('username')?.value,
      email: this.updateProfileForm.get('email')?.value,
      password: this.updateProfileForm.get('password')?.value,
      msisdn: this.updateProfileForm.get('msisdn')?.value,
    }

  }



  public update(): void {
    if(this.updateProfileForm.valid){
      this.authService.showAuthSpinner(true);

      // Obtener datos del formulario

      const formData = this.updateProfileForm.value;

      const updatedProfile = {
        name: formData.username,
        email: formData.email,
        msisdn: formData.msisdn,
      }

      // Actualizar localStorage con los nuevos datos del perfil

      localStorage.setItem('datosRegistro', JSON.stringify(updatedProfile));

      this.authService.updateUser(this.prepareRequest()).subscribe((resp) => {
        this.authService.showAuthSpinner(false);
        if(resp){
          this.router.navigateByUrl('profile');
          this.authService.setUserLoggedInSessionStorage(true);
          this.authService.generateSnackBar(false, literals.success_update);
          this.updateProfileForm.setValue({
            username: updatedProfile.name,
            email: updatedProfile.email,
            msisdn: updatedProfile.msisdn,
          })
        }
        else{
          this.authService.setUserLoggedInSessionStorage(true);
          this.authService.generateSnackBar(true, literals.error_update);
        }
      });
    }else{
      this.authService.generateSnackBar(true, literals.error_form)
    }
  }
}
