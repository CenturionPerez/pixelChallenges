import { Country } from '@angular-material-extensions/select-country';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { literals } from 'src/app/utils/interfaces/util.constants';
import { Literals } from 'src/app/utils/interfaces/util.interface';

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
  });

  constructor(private router: Router){}

    public navigateBack(){
      this.router.navigateByUrl('/init')
    }

}
