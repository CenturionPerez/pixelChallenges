import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private router: Router){}

    public navigateBack(){
      this.router.navigateByUrl('/init');
    }

}
